## Delete git history
```
git checkout --orphan new-branch
git branch -D master
git branch -m new-branch master
```

## Deploy dist folder
```
git remote add deploy <remote-url>
git subtree push --prefix dist deploy master
```
