# kmpcli
A CLI based on KMP algorithm

# Installation
```
npm install -g kmpcli
```

# How to Use?
```
kmpcli --location <directory_name> --text <search_text>
```

# Flags
- --location (shorthand -l) [Mandatory] -> specifies the location or directory name where to find the text
- --text (shorthand -t) [Mandatory] -> specifies the search text
- --show-details [Optional] -> if provided by the user, shows detailed output like the skipped folders and number of occurances

The flags can be used in any order, however kmpcli reads the flags in such a way that the value next to a flag should be the value of the flag. For example: ```kmpcli --location --text ./somePath someText``` is invalid.

# Example
```
kmpcli ./someDir/someSubDir someText
kmpcli D:/abc/def someText
```