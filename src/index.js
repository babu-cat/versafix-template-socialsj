"use strict";

var htmml2html = require('htmml');
var makeThumbs = require('./makeThumbs');
var checkTemplateDefs = require('./checkTemplateDefs');
var fse = require('fs-extra');

var templates = [
{
	'htmml': './template-def/versafix-1-sa-ca/template-versafix-1-sa-ca.htmml',
	'html': './dist/versafix-1-sa-ca/template-versafix-1-sa-ca.html',
	'imgDir': './template-def/versafix-1-sa-ca/img/',
	'destImgDir': './dist/versafix-1-sa-ca/img/',
	'modelPrefix': './model/versafix-1-sa-ca'
},
{
	'htmml': './template-def/versafix-1-sa-es/template-versafix-1-sa-es.htmml',
	'html': './dist/versafix-1-sa-es/template-versafix-1-sa-es.html',
	'imgDir': './template-def/versafix-1-sa-es/img/',
	'destImgDir': './dist/versafix-1-sa-es/img/',
	'modelPrefix': './model/versafix-1-sa-es'
},
];

for (var i = 0; i < templates.length; i++) {
	htmml2html(templates[i].htmml, templates[i].html);
	fse.copySync(templates[i].imgDir, templates[i].destImgDir);
	checkTemplateDefs(templates[i].html, templates[i].modelPrefix);
	makeThumbs(templates[i].html, './edres/', 680, 340);
}
