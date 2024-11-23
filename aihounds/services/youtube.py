import scrapetube

def scrape_youtube(query):
    videos = scrapetube.get_search(query)
    urls = []
    for video in videos:
        urls.append(video['videoId'])
    return {"query": query,"urls": urls}