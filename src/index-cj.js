"use strict";

const htmml2html = require('htmml');
const makeThumbs = require('./makeThumbs');
const checkTemplateDefs = require('./checkTemplateDefs');
const fse = require('fs-extra');
const replace = require('replace-in-file');
const pkg = require('../package.json');
const tmp = require('tmp');
const myArgs = process.argv.slice(2);
const test = myArgs.length > 0 && myArgs[0] == 'test';

var templates = [
{
	'htmml': './template-def/versafix-1-cj-ca/template-versafix-1-cj-ca.html',
	'html': './dist/versafix-1-cj-ca/template-versafix-1-cj-ca.html',
	'tdDir': './template-def/versafix-1-cj-ca/',
	'destDir': './dist/versafix-1-cj-ca/',
	'modelPrefix': './model/versafix-1-cj-ca'
},
{
	'htmml': './template-def/versafix-1-cj-es/template-versafix-1-cj-es.html',
	'html': './dist/versafix-1-cj-es/template-versafix-1-cj-es.html',
	'tdDir': './template-def/versafix-1-cj-es/',
	'destDir': './dist/versafix-1-cj-es/',
	'modelPrefix': './model/versafix-1-cj-es'
},
{
	'htmml': './template-def/versafix-1-cj-en/template-versafix-1-cj-en.html',
	'html': './dist/versafix-1-cj-en/template-versafix-1-cj-en.html',
	'tdDir': './template-def/versafix-1-cj-en/img/',
	'destDir': './dist/versafix-1-cj-en/img/',
	'modelPrefix': './model/versafix-1-cj-en'
},
];

var ok = true;
for (var i = 0; i < templates.length; i++) {
	var htmlFile = test ? tmp.fileSync().name : templates[i].html;
	htmml2html(templates[i].htmml, htmlFile);
    replace.sync({
    	files: htmlFile,
    	from: /__VERSION__/g,
    	to: pkg.version,
    });
	if (!test) fse.copySync(templates[i].tdDir+'img/', templates[i].destDir+'img/');
	if (!test) fse.copySync(templates[i].tdDir+'edres/', templates[i].destDir+'edres/');
	ok = checkTemplateDefs(htmlFile, templates[i].modelPrefix, false) && ok;
	if (!test) makeThumbs(htmlFile, './edres/', 680, 340);
}

if (!ok) process.exitCode = 1;
