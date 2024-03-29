# isptutorproject_website

This will *eventually* be the monorepo for the entire go.isptutor.org website, and perhaps some of the other websites.  This is currently only the *new* stuff and the legacy stuff needs to be moved here (from 46 separate git repos!)

This makes use of yarn workspaces.  The workspaces (packages) are namespaced as `@isptutorproject`

Since a monorepo has so many subdirs, vs code's file explorer can become unusable quite easily.  To help with this, I've created multiple *vs code* workspaces (not to be confused with *yarn* workspaces - to differentiate the two, think of yarn workspaces a javascript packages and vs code workspaces as editor configurations).  I've used a vs code extension called 'Monorepo Workspace' which makes it easy to select which folders you want into your (vs code) workspace and then saved them as app-specific workspaces which list the minimal folders you need when working on that app.This also minimizes the npm scripts listed as well.  


the **yarn** workspaces are contained within the following subdirs: `apps`, `common`, `config`



## Major workspaces listed below, (those unlisted are still skeletons).

```
apps/  <- where web apps live
    di-instr/
    di-prepost/
    homepage/
    hypo-gr/
    hypo-we/   
    isp-static/ *described below*

common/  <- libs/reusable code imported into the web apps
    isp-site-styles/  - styling shared site-wide SCSS
    isp-database/     database abstraction code which lets us use either firebase or localstorage
    navbar/
    snackbar/

config/ <- shared build/config stuff to simplify individual app setup
    eleventy-config/
    webpack-config/
```

There is also a `server` subdirectory for the Django code.  It is not configured as yarn workspace however, as yarn is solely for javascript and django uses python.  This is merely a technicallity though.

I believe I'll be ted tutors in a separate subdir as the build process is drastically different. the BRM will get added to `apps`.  Games will either be added to apps or to it's own subdir.  I think Stefani's other captivate projects will be added to `apps`.   


Basically, the apps get built and their build dirs get installed in a 
`wwwroot` subdir of the project's root.   it's possible that 'wwwroot' will go away and the content will get written to `server/static` or something at some point.


### App anatomy
```
    data/ <- (optional) contains javascript datafile(s)
    dist/  <- (not in git) built app will be generated here
    node_modules <- not in git, package dependecies created by 'yarn'
    scripts/ (optional) 
        buildData.js  (optional) if this file exists, it will be executed by npm scripts to create .json files based off of files in <app>/data/
    src/  <- contains app's js/ts and css/scss  code
    templates/ (optional) if this app includes pre-generated html, the template (nunjucks) files will exist here
      _data/ <- (optional) if templates require data to be built, files will be here, typically they only import/export files in ../../data/
      _includes/ <- files which get reused by other templates
    .eleventy.js  <- (optional) configuration for templates, if being used
    package.json <- list dependencies and npm scripts
    webpack.config.js <- config file which specifies how js and css bundles should be built

```
Each app's code and styles is built via webpack and will create an <appname>.bundle.js and <appname>.bundle.css in the app's `dist` subdir.
If the app makes use of eleventy templates, the generated html, and any images, will also be placed in `dist`. This means that each app is *completely* self-contained within it's "dist" dir, and is re-locatable.
  

`apps/isp-static` (poorly named - historical) is an eleventy setup which merely copies all of the apps/*/dist folders to their appropriate `wwwroot` folder (at the top level of this project).  Since this is no longer a webapp, and simply part of the build process, it should be moved elsewhere

The project root has some npm scripts such as 'build' which trigger the individual apps npm scripts.


