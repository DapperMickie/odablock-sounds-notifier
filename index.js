import { Octokit } from "@octokit/core";
import fetch from 'node-fetch'
import cron from 'node-cron'
import dotenv from 'dotenv'
import express from 'express'

const PORT = process.env.PORT || 5001
const app = express();

app.get('/', (req, res) => {
  res.send('<h1> Hello, World! </h1>');
});
 
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});

dotenv.config();
cron.schedule('* * * * *', () => {
  const octokit = new Octokit({
    auth: process.env.GITCRED,
    request:{fetch}
  })
  octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
    owner: process.env.GITOWNER,
    repo: process.env.GITREPO,
    workflow_id: process.env.GITHUBWORKFLOWNAME,
    ref: 'main',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(good=>{
    console.log("updated code");
    fetch("https://odablock-updater-2f1923601e95.herokuapp.com/")
    .then(()=>{
      console.log("pinged");
    })
  }, rejected=>{
    console.log("Something went wrong?");
  })
});
