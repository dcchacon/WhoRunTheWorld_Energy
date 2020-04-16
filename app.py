from flask import Flask, render_template, redirect
from datetime import datetime
import scrape_energy
import pymongo
import json

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
energy_db = client.energy
table = energy_db.energy_data


@app.route("/")
def mainroute():      
    data = table.find_one()
    print(data)
    return render_template("data.html", data = data, current_time=datetime.utcnow())


@app.route("/data")
def scrape_data():
    scraped_data = scrape_energy.scrape()
    table.delete_many({})
    table.insert(scraped_data)
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug = True)