from base.models import Event, EventMember
from base.serializers import EventSerializer, EventMemberSerializer
from base.views.baseViews import response, error

from bs4 import BeautifulSoup
import requests
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time


def getEventJsonObjects(soupFound):
    baseEventWebsite = "https://www.eventfinda.com.au/"

    eventJsonObjectsArray = []
    for indvEvent in soupFound:
        spanArray = []
        spans = indvEvent.find_all('span')
        for span in spans:
            spanArray.append(span)

        if indvEvent.h2 != None:
            eventJsonObject = {
                'title': indvEvent.h2.a.get_text().replace(u'\xa0', u' '),
                'location': indvEvent.p.span.get_text().replace(u'\xa0', u' '),
                'time': spanArray[2].get('title'),
                'category': spanArray[3].get_text().replace(u'\xa0', u' '),
                'link': baseEventWebsite + indvEvent.h2.a.get('href')
            }

            eventJsonObjectsArray.append(eventJsonObject)

    return eventJsonObjectsArray

def get(request, page):

    if int(page) < 1 or int(page) > 10:
        return error('Max page = 10')

    url_to_scrape = "https://www.eventfinda.com.au/whatson/events/australia/page/" + page

    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(chrome_options=options)
    driver.get(url_to_scrape)
    time.sleep(2)
    page = driver.page_source
    driver.quit()

    soup = BeautifulSoup(page, 'html.parser')
    findDiv = soup.find_all("div", {"class": "card-body"})
    eventJsonObjects = getEventJsonObjects(findDiv)

    return response('Event suggestions retrieved', eventJsonObjects)