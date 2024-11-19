import { cacheToken, cacheKey } from "./conf.js";
export function generateFetchComponent() {
    return {
        setData: (data) => {
            return new Promise((resolve, reject) => {
                fetch("https://ws.cipiaceinfo.it/cache/set", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            "key": cacheToken
                        },
                        body: JSON.stringify({
                            key: cacheKey,
                            value: JSON.stringify(data)
                        })
                    })
                    .then(r => r.json())
                    .then(data => {resolve(data.result)})
                    .catch(err => reject(err.result));
            });
        },
        getData: () => {
            return new Promise((resolve, reject) => {
                fetch("https://ws.cipiaceinfo.it/cache/get", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            "key": cacheToken
                        },
                        body: JSON.stringify({
                            key: cacheKey
                        })
                    })
                    .then(r => r.json())
                    .then(data => resolve(data.result))
                    .catch(err => reject(err.result));
            })
        }
    };
}