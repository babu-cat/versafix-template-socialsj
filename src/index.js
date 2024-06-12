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
	'htmml': './template-def/versafix-1-asi-ca/template-versafix-1-asi-ca.htmml',
	'html': './dist/versafix-1-asi-ca/template-versafix-1-asi-ca.html',
	'tdDir': './template-def/versafix-1-asi-ca/',
	'destDir': './dist/versafix-1-asi-ca/',
	'modelPrefix': './model/versafix-1-asi-ca'
},
{
	'htmml': './template-def/versafix-1-sa-ca/template-versafix-1-sa-ca.htmml',
	'html': './dist/versafix-1-sa-ca/template-versafix-1-sa-ca.html',
	'tdDir': './template-def/versafix-1-sa-ca/',
	'destDir': './dist/versafix-1-sa-ca/',
	'modelPrefix': './model/versafix-1-sa-ca'
},
{
	'htmml': './template-def/versafix-1-sa-es/template-versafix-1-sa-es.htmml',
	'html': './dist/versafix-1-sa-es/template-versafix-1-sa-es.html',
	'tdDir': './template-def/versafix-1-sa-es/',
	'destDir': './dist/versafix-1-sa-es/',
	'modelPrefix': './model/versafix-1-sa-es'
},
{
	'htmml': './template-def/versafix-1-cb-ca/template-versafix-1-cb-ca.htmml',
	'html': './dist/versafix-1-cb-ca/template-versafix-1-cb-ca.html',
	'tdDir': './template-def/versafix-1-cb-ca/',
	'destDir': './dist/versafix-1-cb-ca/',
	'modelPrefix': './model/versafix-1-cb-ca'
},
{
	'htmml': './template-def/versafix-1-lv-ca/template-versafix-1-lv-ca.htmml',
	'html': './dist/versafix-1-lv-ca/template-versafix-1-lv-ca.html',
	'tdDir': './template-def/versafix-1-lv-ca/',
	'destDir': './dist/versafix-1-lv-ca/',
	'modelPrefix': './model/versafix-1-lv-ca'
},
{
	'htmml': './template-def/versafix-1-ms-ca/template-versafix-1-ms-ca.htmml',
	'html': './dist/versafix-1-ms-ca/template-versafix-1-ms-ca.html',
	'tdDir': './template-def/versafix-1-ms-ca/',
	'destDir': './dist/versafix-1-ms-ca/',
	'modelPrefix': './model/versafix-1-ms-ca'
},
{
	'htmml': './template-def/versafix-1-ms-es/template-versafix-1-ms-es.htmml',
	'html': './dist/versafix-1-ms-es/template-versafix-1-ms-es.html',
	'tdDir': './template-def/versafix-1-ms-es/',
	'destDir': './dist/versafix-1-ms-es/',
	'modelPrefix': './model/versafix-1-ms-es'
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
