from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException
from flask_cors import CORS
from webdriver_manager.chrome import ChromeDriverManager
import logging
import time

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

def create_driver():
    """Create and configure Chrome WebDriver instance"""
    try:
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--page-load-timeout=30')
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        return driver
    except Exception as e:
        logger.error(f"Failed to create driver: {str(e)}")
        raise

def is_content_loaded(driver):
    """
    Check if meaningful content has loaded by comparing content over time
    Returns True if content has stabilized, False otherwise
    """
    try:
        # Get initial content
        initial_content = driver.find_element(By.TAG_NAME, "body").text
        # Wait a short time
        time.sleep(1)
        # Get content again
        new_content = driver.find_element(By.TAG_NAME, "body").text
        
        # Check if content length has changed significantly
        content_changed = len(new_content) / max(len(initial_content), 1) > 1.2
        has_meaningful_content = len(new_content.strip()) > 100
        
        return not content_changed and has_meaningful_content
    except StaleElementReferenceException:
        return False

def wait_for_content(driver, timeout=20):
    """Wait for dynamic content to load and return page text"""
    try:
        start_time = time.time()
        previous_content = ""
        
        while time.time() - start_time < timeout:
            # Check if document ready state is complete
            doc_ready = driver.execute_script("return document.readyState") == "complete"
            
            if doc_ready:
                # Get current content
                current_content = driver.find_element(By.TAG_NAME, "body").text
                
                # If content has stabilized and is meaningful
                if (len(current_content.strip()) > 100 and 
                    current_content == previous_content and 
                    is_content_loaded(driver)):
                    return current_content
                
                previous_content = current_content
            
            time.sleep(1)
        
        raise TimeoutException("Content did not stabilize within timeout")
        
    except Exception as e:
        logger.error(f"Error while waiting for content: {str(e)}")
        raise

@app.route('/extract', methods=['POST'])
def scraper():
    """Extract text content from provided URL"""
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    driver = None
    try:
        driver = create_driver()
        logger.info(f"Accessing URL: {url}")
        
        driver.set_page_load_timeout(30)
        driver.get(url)
        
        # Wait for and get content
        page_text = wait_for_content(driver)
        
        if not page_text.strip():
            return jsonify({'error': 'No content found after loading'}), 404
            
        return jsonify({'content': page_text.strip()}), 200
    
    except TimeoutException as te:
        logger.error(f"Timeout error: {str(te)}")
        return jsonify({'error': 'Page took too long to load or content did not stabilize'}), 504
        
    except Exception as e:
        logger.error(f"Scraping failed: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
    finally:
        if driver:
            driver.quit()
            logger.info("WebDriver closed successfully")

if __name__ == '__main__':
    app.run(debug=True)