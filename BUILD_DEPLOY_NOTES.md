Need to run a Next.js export, which writes to /out, then upload that to Netlify.

```
netlify deploy --dir=out
```

Next.js export fails (something to do with "window is not defined", the fucking server-side rendering causes so many problems) but it seems like we can just ctrl-c out and deploy anyway. Worth digging into if I ever take this project further