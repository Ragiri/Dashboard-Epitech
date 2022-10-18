# **Back-End Documentation**

## **Version**

v1.0.0

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Login user | `POST` | `/checkExistance` |
| Add a new user | `POST` | `/signup` |
| ---- | ---- | ---- |
| About widget | `GET` | `/about.json`|
|  Add weather widget | `POST`| `/addWeatherWidget`|
|  Add steam widget | `POST`| `/addSteamWidget`|

### **Developpement Url**

- http://localhost:8080

## **Routes description**

### **Login user**

Request type: `POST`.

URL: `/checkExistance`.

Give mail and password, googleId or facebookId. Returns the name of the user.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "status": "OK",
            "name": "test,
        }
    ]
}
```

### **Add a new user**

Request type: `POST`.

URL: `/signup`.

Give  mail and password, googleId or facebookId and with this the name and the type: `local`, `facebook` or `google`. Returns the status.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "status": "OK",
        }
    ]
}
```
 ### **About widget**

Request type: `GET`.

URL: `/about.json`.

Give Nothing. Returns the widget info.

Here is an example of a **response**:
```json
"client": {
    "host": "127.0.0.0"
  },
 "server": {
     "current_time": "current date with hour",
     "services": [{
        "name": "weather",
        "widgets": [{
           "name": "weatherWidget",
           "description": "Display temperature for a city with small description.",
           "params": [{
                "name": "cityWeather",
                "type": "string"
             }]
         }]
    },]
}
```

### **Add weather widget**

Request type: `POST`.

URL: `/addWeatherWidget`.

Give username and city. Returns the status.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "status": "OK",
        }
    ]
}
```

### **Add steam widget**

Request type: `POST`.

URL: `/addSteamWidget`.

Give username and playerId. Returns the status.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "status": "OK",
        }
    ]
}
```

## **Database**

We uses a MySQL database for this API. See the doc here ([documentation](../mysql/README.md))
