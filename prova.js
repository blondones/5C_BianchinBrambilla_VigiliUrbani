import { generateFetchComponent } from "./fetch.js";

const x = generateFetchComponent();
x.setData({
    "indirizzo": "piazza del duomo",
    "dataOra": "12/12/2012T07:23",
    "targhe": "xx123cc",
    "morti": 1,
    "feriti": 1,
    "key":  "piazza del duomo12/12/2012T07:23"

}).then(console.log).catch(console.error)