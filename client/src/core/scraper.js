//Importing dependencies. Read up on each dependency to understand functionality.
import cheerio from "cheerio"; //https://www.npmjs.com/package/cheerio

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

export default async function scrape(urlInput) {
  const url = new URL(urlInput);
  var hostname = url.hostname;
  /*
    Indeed => https://ca.indeed.com/viewjob?jk=b62ca112e12e6364&q=web+part+time&tk=1eqb2dqght45m801&from=web&advn=2144944112092706&adid=362195945&ad=-6NYlbfkN0CZeBAJkWyZrhwM3pOyJKGRoaUsRZDp52k-dVgPRBS43a-cu-96iIcjqMl3fh_Px4_KKFYhA1Y8cGYH_T90uGExBNOpj_AcUJXEpOGgm9h6RMxj4yWIjhwhOMSHgN8VJsj3jrhNfYy6wsbr5Y71yB0epGwFyEOR2apZMlW3-Qb0QVgkwKzanSGoKAr4dcwelxyv0h2xvhHQCdyEEEAola7NEmc8Sq8-d5SSgxAOc4_XQ-j9IAmpSXHp67n_ne5Fi_X_M2nx5H__eMXcTdQYZTt7bdDTEKEd-kqjWvmOqXkDotCYAge1wS5TubZ96ktlGaTzXJBUvzVqnQ%3D%3D&sjdu=KOlLyRY8q_4LTGyuntOL9bxrWLxRDEGVM2WRMoGoNMZsTT7omU11Ka6zyqAxUD4zJZS9xpW3jIl0WFTU8W1jRhHK5egy0WGWE5hgVUFmvwT3nODCBUTtv9HpS5Z3tbHbR6bucz87RxqAv6ACjSg_Is9gVXttOUYoDMk6JBnEJsym3ACVE97nWeVptnMfujIs&acatk=1eqb2e363t5m7801&pub=4a1b367933fd867b19b072952f68dceb&vjs=3
    Canada Government Job Bank => https://www.jobbank.gc.ca/jobsearch/jobposting/33620257?source=searchresults
    myworkdayjobs => https://mastercard.wd1.myworkdayjobs.com/en-US/Campus/job/Santiago-Chile/Student-Intern_R-112202
    linkedin => https://www.linkedin.com/jobs/view/2324710665/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=imAkHLzYwD4GyzcgI2y5dQ%3D%3D&trackingId=xpiRlbeeaQYm5t758NDUWw%3D%3D&trk=flagship3_search_srp_jobs
  */
  switch (true) {
    case hostname.includes("indeed.com"):
      return await fetchIndeed(url);
    case hostname.includes("jobbank.gc.ca"):
      return await fetchCanada(url)
    case hostname.includes("myworkdayjobs.com"):
      return await fetchWorkday(url);
    case hostname.includes("linkedin.com"):
      return await fetchLinkedIn(url);
    default:
      console.log("url not found in our database");
      return("NOT VALID URL");
    }
}

//SCRAPING & API FUNCTIONS
async function fetchIndeed(url) {
  try {
    const page = ipcRenderer.sendSync('load-url', url.href);
    const $ = cheerio.load(page);
    //Checks which case it is
    if (url.pathname === "/viewjob") {
      $( "*" ).each(function( index ) {
        $( this ).append(' ');
      });
      let text = $("#jobDescriptionText").text();
      text = text.replace(/\s\s+/g, ' ');
      return text;
    } else {
      console.log("NOT A VALID JOB POSTING. MAKE SURE THAT IT'S ON ITS OWN PAGE");
      return notValid();
    }
  } catch (err) {
    console.log("ERROR URL", err.config);
  }
}

async function fetchCanada(url) {
  try {
    if (url.pathname.includes("jobposting")) { 
      const page = ipcRenderer.sendSync('load-url', url.href);
      const $ = cheerio.load(page);
      $( "*" ).each(function( index ) {
        $( this ).append(' ');
      });
      let str = $('.job-posting-detail-requirements').text()
      str = str.replace(/\s\s+/g, ' ');
      return str;
    }
    else { 
      console.log("NOT A VALID JOB POSTING");
      return notValid();
    }
  } catch (err) {
    console.log("ERROR URL", err);
  }
}

async function fetchWorkday(url) {
  try {
    if (url.pathname.includes("job")) { 
      const page = ipcRenderer.sendSync('load-url', url.href);
      //let title = page.openGraphAttributes.title
      let content = page.openGraphAttributes.description;
      return content;
    }
    else { 
      console.log("NOT A VALID JOB POSTING");
      return notValid();
    }
  } catch (err) {
    console.log("ERROR URL", err.config);
  }
}

async function fetchLinkedIn(url) {
  try {
    const page = ipcRenderer.sendSync('load-url', url.href);
    //console.log(page);
    const $ = cheerio.load(page);
    //console.log($);
    if (url.pathname.includes("/jobs/view/")){
        $( "*" ).each(function( index ) {
          $( this ).append(' ');
        });
        let text = $(".description").text();
        text = text.replace(/\s\s+/g, ' ');
        return text;
    } else {
      console.log("NOT A VALID JOB POSTING");
      return notValid();
    }
  } catch (err) {
    console.log("ERROR URL", err.config);
  }
}

function notValid() {
    //TODO: Send client message that url is not a valid job posting
    return("NOT VALID URL");
}

