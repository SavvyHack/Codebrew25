import os
import requests
from duckduckgo_search import DDGS

# List of (search query, filename) tuples
products = [
    ("fruits oranges", "fruits_oranges1.png"),
    ("fruits strawberries", "fruits_strawberries1.png"),
    ("fruits apples", "fruits_apples1.png"),
    ("fruits bananas", "fruits_bananas1.png"),
    ("fruits blueberries", "fruits_blueberries1.png"),
    ("fruits pears", "fruits_pears1.png"),
    ("dairy whole milk", "dairy_wholemilk1.png"),
    ("dairy cheddar cheese", "dairy_cheddarcheese1.png"),
    ("dairy yogurt", "dairy_yogurt1.png"),
    ("dairy butter", "dairy_butter1.png"),
    ("dairy cream", "dairy_cream1.png"),
    ("fats and oils olive oil", "fatsandoils_oliveoil1.png"),
    ("fats and oils sunflower oil", "fatsandoils_sunfloweroil1.png"),
    ("fats and oils coconut oil", "fatsandoils_coconutoil1.png"),
    ("vegetables carrots", "vegetables_carrots1.png"),
    ("vegetables broccoli", "vegetables_broccoli1.png"),
    ("vegetables potatoes", "vegetables_potatoes1.png"),
    ("vegetables tomatoes", "vegetables_tomatoes1.png"),
    ("vegetables spinach", "vegetables_spinach1.png"),
    ("vegetables onions", "vegetables_onions1.png"),
    ("vegetables lettuce", "vegetables_lettuce1.png"),
    ("condiments tomato sauce", "condiments_tomatosauce1.png"),
    ("condiments mayonnaise", "condiments_mayonnaise1.png"),
    ("condiments mustard", "condiments_mustard1.png"),
    ("condiments bbq sauce", "condiments_bbqsauce1.png"),
    ("beverage apple juice", "beverage_applejuice1.png"),
    ("beverage orange juice", "beverage_orangejuice1.png"),
    ("beverage milkshake", "beverage_milkshake1.png"),
    ("beverage lemonade", "beverage_lemonade1.png"),
    ("sweets honeycomb", "sweets_honeycomb1.png"),
    ("sweets chocolate bar", "sweets_chocolatebar1.png"),
    ("sweets fruit cake", "sweets_fruitcake1.png"),
    ("sweets jam donut", "sweets_jamdonut1.png"),
]


output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "product-pic-list")
os.makedirs(output_dir, exist_ok=True)

def download_image(url, path):
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            with open(path, "wb") as f:
                f.write(resp.content)
            print(f"Downloaded {os.path.basename(path)}")
            return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
    return False

with DDGS() as ddgs:
    for query, filename in products:
        print(f"Searching for: {query}")
        results = list(ddgs.images(query, safesearch="moderate", max_results=3))
        image_url = None
        for r in results:
            if r.get("image"):
                image_url = r["image"]
                break
        if image_url:
            save_path = os.path.join(output_dir, filename)
            if not download_image(image_url, save_path):
                print(f"Could not download image for {query}")
        else:
            print(f"No image found for {query}")
