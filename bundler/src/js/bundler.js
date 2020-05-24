const path = require('path');
const fs = require('fs');
const parse = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const babel = require('@babel/core');

// 模块分心
const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');

    const dependencies = {}; // 依赖存放文件

    // ast 抽象语法树
    const ast = parse.parse(content, {
        sourceType: 'module',
    })
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirName = path.dirname(filename);
            const newFile =  './src/js/' + path.join(dirName, node.source.value);
            dependencies[node.source.value] = newFile;
            console.log('node ==============', dependencies)
        }
    })
    // console.log('content', content);
    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });
    console.log('code', code);
    return {
        filename,
        dependencies,
        code,
    }
}

const moduleInfo = moduleAnalyser('./index.js');
console.log(moduleInfo);


const path = require('path');
const fs = require('fs');
const parse = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const babel = require('@babel/core');

// 模块分心
const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');

    const dependencies = {}; // 依赖存放文件

    // ast 抽象语法树
    const ast = parse.parse(content, {
        sourceType: 'module',
    })
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirName = path.dirname(filename);
            const newFile = path.join(dirName, node.source.value);
            dependencies[node.source.value] = newFile;
            // console.log('node ==============', dependencies)
        }
    })
    // console.log('content', content);
    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });
    // console.log('code', code);
    return {
        filename,
        dependencies,
        code,
    }
}

// 要把所有的依赖关系都分析出来放到一个点
const maskDependenciesGraph = (entry) => {
    const moduleEntry = moduleAnalyser(entry);
    const graphArray = [moduleEntry];
    for(let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const {dependencies} = item;
        if (dependencies) {
            for(let j in dependencies) {
                graphArray.push(
                    moduleAnalyser(dependencies[j])
                )
            }
        }
    }

    const graph = {};
    graphArray.forEach((item) => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code,
        }
    })
    return graph;
}

const generateCode = (entry) => {
    const graphInfo = JSON.stringify(maskDependenciesGraph(entry));
    return `
        (function(graphInfo){
            function require(module) {
                (function(code){
                    eval(code);
                })(graphInfo[module].code)
            }
            require('${entry}');
        })(${graphInfo});
    `;
}
const code = generateCode('./index.js');
console.log('code', code);