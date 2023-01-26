# tyn-hash-creator

Hash Creator Within PHP function on NodeJS application to promise

## Installation

bash
npm install tyn-hash-creator


## Usage

var execPhp = require('tyn-hash-creator').phpExec



var mhash = await execPhp(path, phpbin,data, iv, salt, saltWithPassword)


## Arguments

1. `path::string` Path to user php file.
1. `phpbin::string` Path to engine php binary file.
1. `callback::function` its a promise function with use await or then, catch 

## Example

php
// file.php
<?
function tynhash($data,$iv,$salt,$saltWithPassword)
    {
        $encrypted = openssl_encrypt("$data", 'aes-256-cbc', "$saltWithPassword", null, $iv);

        $msg_encrypted_bundle = "$iv:$salt:$encrypted";
        $msg_encrypted_bundle = str_replace('/', '__', $msg_encrypted_bundle);

        return $msg_encrypted_bundle;
    }

?>


js
// app.js
var execPhp = require('tyn-hash-creator').phpExec

var mhash = await execPhp(path, phpbin,data, iv, salt, saltWithPassword)