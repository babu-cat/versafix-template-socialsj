"use strict";

var htmml2html = require('htmml');
var makeThumbs = require('./makeThumbs');
var checkTemplateDefs = require('./checkTemplateDefs');
var fse = require('fs-extra');

var templates = [
{
	'htmml': './template-def/versafix-1-cj-ca/template-versafix-1-cj-ca.html',
	'html': './dist/versafix-1-cj-ca/template-versafix-1-cj-ca.html',
	'imgDir': './template-def/versafix-1-cj-ca/img/',
	'destImgDir': './dist/versafix-1-cj-ca/img/',
	'modelPrefix': './model/versafix-1-cj-ca'
},
{
	'htmml': './template-def/versafix-1-cj-es/template-versafix-1-cj-es.html',
	'html': './dist/versafix-1-cj-es/template-versafix-1-cj-es.html',
	'imgDir': './template-def/versafix-1-cj-es/img/',
	'destImgDir': './dist/versafix-1-cj-es/img/',
	'modelPrefix': './model/versafix-1-cj-es'
},
{
	'htmml': './template-def/versafix-1-cj-en/template-versafix-1-cj-en.html',
	'html': './dist/versafix-1-cj-en/template-versafix-1-cj-en.html',
	'imgDir': './template-def/versafix-1-cj-en/img/',
	'destImgDir': './dist/versafix-1-cj-en/img/',
	'modelPrefix': './model/versafix-1-cj-en'
},
];

for (var i = 0; i < templates.length; i++) {
	htmml2html(templates[i].htmml, templates[i].html);
	fse.copySync(templates[i].imgDir, templates[i].destImgDir);
	checkTemplateDefs(templates[i].html, templates[i].modelPrefix);
	makeThumbs(templates[i].html, './edres/', 800, 340);
}
