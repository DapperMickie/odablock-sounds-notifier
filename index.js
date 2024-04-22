import { Octokit } from "@octokit/core";
import fetch from 'node-fetch'
import cron from 'node-cron'
import dotenv from 'dotenv'

dotenv.config();
cron.schedule('* * * * *', () => {
  const octokit = new Octokit({
    auth: process.env.GITCRED,
    request:{fetch}
  })
  
  octokit.request('POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun', {
    owner: process.env.GITOWNER,
    repo: process.env.GITREPO,
    run_id: process.env.GITRUNJOBID,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(good=>{
    
  }, rejected=>{})
});
