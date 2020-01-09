const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

const BASE_PATH = 'dist'
const SITEMAP_TEMPLATE = 'dist/sitemap/index.html'
const SITE_URL = 'https://www.ltonetwork.com'

function getFiles(dir, fileList) {
    files = fs.readdirSync(dir)
    fileList = fileList || []
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = getFiles(path.join(dir, file), fileList)
        } else {
            fileList.push(path.join(dir, file))
        }
    })
    return fileList.filter(
        fileName => fileName.indexOf('index.html') >= 0 && fileName.indexOf('404') < 0 && !isNoIndex(fileName)
    )
}

function getFileDetails(fileList) {
    detailedFileList = []
    fileList.forEach(file => {
        detailedFileList.push({
            path: file.replace(BASE_PATH, SITE_URL).replace('index.html', ''),
            mtime: fs.statSync(file).mtime.toISOString(),
        })
    })
    return detailedFileList
}

function isNoIndex(file) {
    const fileContent = fs.readFileSync(file, 'utf-8').toString()
    return fileContent.match(/\bnoindex\b/g)
}

async function buildXml(detailedFileList) {
    const versionString = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl"?>\n`
    const urlSetBeginString = `<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    const endString = '</urlset>'

    let urlsString = ''
    detailedFileList.forEach(file => {
        urlsString += `<url><loc>${file.path}</loc><lastmod>${file.mtime}</lastmod></url>\n`
    })

    let fullString = (versionString + urlSetBeginString + urlsString + endString).replace(/\\/gi, '/')
    fs.writeFileSync(path.join(BASE_PATH, 'sitemap_index.xml'), fullString)
    console.log('sitemap_index.xml created')
}

async function buildHtml(detailedFileList) {
    let doc = (await JSDOM.fromFile(SITEMAP_TEMPLATE)).window.document
    let listContainer = doc.querySelector('.f24-list')
    detailedFileList.forEach(file => {
        listContainer.innerHTML += `<li><a href="${file.path}">${file.path.replace(/\\/gi, '/')}</a></li>`
    })
    let fullString = '<!doctype html>' + doc.querySelector('html').outerHTML
    fs.writeFileSync(path.join(BASE_PATH, 'sitemap/index.html'), fullString)
    console.log('sitemap/index.html created')
}

function readFromFile(path) {
    return fs.readFileSync(path)
}

async function buildSitemap() {
    const fileList = getFiles(BASE_PATH, [])
    const detailedFileList = getFileDetails(fileList)
    let promises = [buildXml(detailedFileList)]
    await Promise.all(promises, _ => {
        return true
    })
}

gulp.task('sitemap', buildSitemap)
