# di_module
temporary repo until i move this code elsewhere

# installation

`npm install`

# usage 

(in vs-code)

* in bottom left, you will see ">NPM SCRIPTS"
  * expand that
  * if you hover over (wrench icon) "start", a right arrow button will get displayed
    * click on that  (this is the equivalent to vs codes "go live", but it works
      for files which require processing prior to serving them to your web browser)
    * you *may* have issues the first time this runs, due to race conditions between
      the 2 commands which 'start' runs in parallel.  If this occurs, I suggest running
      the 'build' npm task (described below) first, and then re-running 'start'    
  * 'build' processes all of the files, but doesn't serve them to your browser. All of the
    files are simply compiled and placed in a 'di' folder it creates, which is the generated
    portion of the website for this "app".  this folder could simply be copied to our
    websites top folder, and would be accesed as go.isptutor.org/di/


    "test": "jest-webpack --testPathPattern src/tests/sceneData.test.js",
    "@mtgroup/jest-webpack": "^0.5.1",
    "@types/jest": "^25.1.2",
    "jest": "^25.1.0",
