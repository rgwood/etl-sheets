I'm experimenting with better tooling for ETL systems. How can we make common data issues *quick* to resolve? Can automated data transformations be as easy to work with as spreadsheets?

I think the answer to those questions is yes, but don't take my word for it – you can try out the latest version at [etlsheets.netlify.com](http://etlsheets.netlify.com).

## Motivation

Importing data at scale is painful. Your data providers *will* screw up the formatting, systems *will* experience connectivity issues, and your transformation logic *will* encounter cases you didn't expect. What if our tools focused on helping with those failures, instead of assuming the [happy path](https://en.wikipedia.org/wiki/Happy_path)?

Speaking of transformations, how should we write them? Some systems take a code-first approach, which is great for coders and impenetrable for everyone else. Others take a GUI-driven approach, which usually becomes [the stuff of nightmares](https://www.iri.com/blog/wp-content/uploads/2016/03/EDIT-IN-WP-From-Informatica-to-Voracity-via-ADS-CATfX-Paul-Kinnier-AnalytiX-DS-2.jpg). 

It's weird, because every office already has a tool that lets "non-technical" people write complex data transformations:

![Excel](docs/excel.gif)



# Transformations

Most ETL systems are either:

1. Code-first
    - Nice for developers, terrible for everyone else 
1. GUI-driven

Code is nice for developers. GUIs are nice for...

# Extractions

Data extractions that should be dead simple fail all the time. Counterparties provide bad data, network connectivity goes down, you name it. What if we had [tools that let you immediately pinpoint the error and then remedy the issue without diving into code](https://etlsheets.netlify.com/extract/?id=4564977)?

![Extract failure](docs/extractFailure.jpg)