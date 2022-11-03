![node](https://img.shields.io/badge/node-16-green)

# sensors IOT

## Display continuous data streams of sensors

## 🤔 How do I use this?

<details>
<summary>Hey- before you actually use this, make sure you've [Docker](https://www.docker.com/) and docker-compose (comes with latest verions of Docker) installed and running. Expand to read more</summary>
<br>
</details>

### Step 1: Build Image

In your project directory, run

```sh
docker-compose build --no-cache 
```

### Step 2: Start Service

When build is complete you can start the service (make sure port 3000 is free on your local machine) with:

```sh
docker-compose up
```

### Step 3: Verfiy Services

You can verify services with:

```sh
docker-compose ps
```


#### If you need to stop services:

```sh
docker-compose stop
```

### Step 4: Open browser and go to url below
```sh
http://localhost:3000
```


# REFLECTION:
#### What aspect of this exercise did you find most interesting?
The interesting part of the exercise is I get to use of lot the things I know on a small piece of exercise like this one. When you begin at first it looks small but then by the time you are done thinking through the ask, you begin to rule out which tools are not fit for purpose and use the right tools for the right job.

#### What did you find most cumbersome?
It was not really cumbersome but the fact that the server is minified and you can only log the data when you implement the frontend. Thankfully there were pointers in the instructions for the shape of the data so that was alright. 

#### React optimization techniques
- We should use a global state management solution like React Context API or Redux. In this project I use Redux Toolkit. This prevents prop drilling thereby causing the whole tree to rerender when the parent component updates
- I also make sure my sensors state was separate from the other states in the app, this is to make sure that when I am updating state I update only the sensors state so as to prevents update the global state
- I also made sure my sensors state as an object and not an array. This is because if my state was an array, I would have to find the particular sensor whose state has changed using a array method like `find` and then update the particular item an then insert in place `splice` and that will cause a huge problem on a very large array causing a time complexity of O(n)
- I also did some optimization by making sure each sensor is it's own component thereby separating renders to component level. I then memomized each card to make sure that if the `sensor` prop on the card doesn't change then the card will not rerender. This is a huge benefit in a large project
- I also suggest techinques like using Web workers to run the websocket steam on a separate thread from the UI thread
- Also made sure that there were not inline functions being used because React will recreate these functions on every render and this will be bad for performance in a huge project. Also the use of `useCallback` so functions are only reacreated when dependencies change



