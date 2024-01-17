<template>
    <div class="layoutContainer">
        <div class="mainContainer">
            <div class="uploadNav">
                <div class="uploadButton">
                    <label class="w-1/2 text-sm text-slate-50">Upload Text File</label>
                    <input
                        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-green-400 file:text-sm file:bg-transparent file:text-slate-50 hover:file:bg-green-400 hover:file:text-slate-50"
                        type="file" @change="handleTextFileUpload"><br />
                </div>
                <div class="uploadButton">
                    <label class="w-1/2 text-sm text-slate-50">Upload JSON File</label>
                    <input
                        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-green-400 file:text-sm file:bg-transparent file:text-slate-50 hover:file:bg-green-400 hover:file:text-slate-50"
                        type="file" @change="handleJsonFileUpload"><br />
                </div>
            </div>
            <div class="sectionContainer">
                <div class="textContainer">
                    <ol type="1">
                        <li ref="line" v-for="(line, index) of lines" :key="index">
                            <div class="flex">
                                <span v-if="textFileContents" class="bulletNumber" :style="{'width': index === 0 ? '1.8rem' : '1rem'}">{{ index }}</span>
                                <div class="textWords" :style="{ 'text-decoration': index == lineIndex ? 'underline' : 'none', 'text-decoration-thickness': index == lineIndex ? '4px' : '0px', 'text-decoration-color': index == lineIndex ? '#68d391' : 'inherit' }">
                                    <template v-for="(word, wIndex) of line.split(/[*]/)" :key="wIndex">
                                        <li ref="word">
                                            <p v-if="wIndex === 0" :style="{'color': wIndex === 0 ? '#68d391' : 'white','text-decoration': wIndex === wordIndex && index === lineWordIndex ? 'underline' : 'none','text-decoration-thickness': wIndex === wordIndex && index === lineWordIndex ? '4px' : '0px','text-decoration-color': wIndex === wordIndex && index === lineWordIndex ? '#68d391' : 'inherit',}">{{ word ? word : null }}</p>
                                            <pre v-else :style="{'margin-top':index === 0 ? '3px' : '2px','color': wIndex === 0 ? '#68d391' : 'white','text-decoration': wIndex === wordIndex && index === lineWordIndex ? 'underline' : 'none','text-decoration-thickness': wIndex === wordIndex && index === lineWordIndex ? '4px' : '0px','text-decoration-color': wIndex === wordIndex && index === lineWordIndex ? '#68d391' : 'inherit',}" contenteditable="true" @input="handleTextFileEdit">{{ wIndex === 1 ? '*' : null }}{{ word ? word : null }}{{ wIndex === 1 ? '*' : null }}</pre>
                                        </li>
                                    </template>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
                

                <div class="w-1/2 p-2 tracking-wide overflow-y-auto" style="height: 40rem; scrollbar-color: #cbd5e1 #1e293b;">
            <div>
                <div class="" v-if="(textFileContents)">
                    <template v-for="(line, lIndex) in lines" :key="line">
                        <div class="w-full mx-auto block text-slate-50" v-for="(word, index) in line.split(/[*]/)"
                            :key="index">
                            <div v-for="(item, index) in singleArray" v-bind:key="index">
                                <template v-if="word.trim() === item.key.trim()">
                                    <div class="mb-2" @click=toggleActive(index)>
                                        <template class="flex items-center border-slate-600 border-b-[1px]">
                                            <svg class="w-5 h-5 m-2 fill-current text-slate-50 "
                                                :class="{ 'rotate-180': item.active }" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24">
                                                <path fill-rule="evenodd"
                                                    d="M7.293 8.293a1 1 0 011.414 0L12 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <h3 class="flex cursor-pointer font-bold" @mouseover="highlightLine(lIndex)"
                                                @mouseleave="removeLineHighlight">
                                                <h4
                                                    class="w-10 flex justify-center items-center text-slate-800 mx-4 my-2 px-1 text-sm font-bold bg-green-400">
                                                    {{ item.key }}</h4>
                                                <p class="mx-4 my-2 text-sm font-light flex items-center">{{ item.value
                                                }}</p>
                                            </h3>
                                        </template>
                                        <div class="p-2" v-if="item.active">
                                            <ul class="list-disc list-inside" v-for="(words, wIndex) in line.split(/[*]/)"
                                                :key="wIndex">
                                                <template v-for="(answer, indexes) in item.children" v-bind:key="indexes">
                                                    <li class="mb-2 flex p-2 border-slate-600 border-b-[1px]"
                                                        v-if="words.trim() === answer.trim()" :key="indexes"
                                                        @mouseover="highlightWord(lIndex, Object.keys(item.children).indexOf(indexes))"
                                                        @mouseleave="removeWordHighlight">
                                                        <p class="w-1/2 text-[14px]">{{ indexes }}</p>
                                                        <p class="text-slate-500">{{ "<" + answer + ">" }}</p>
                                                    </li>
                                                </template>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            headerText: '',
            bodyText: '',
            textFileContents: '',
            jsonFileData: {},
            singleArray: [],
            lineIndex: '100',
            lineWordIndex: '100',
            wordIndex: '100',
        };
    },
    methods: {
        handleTextFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.textFileContents = reader.result;
                // this.updateJsonFileData();
            };
            reader.readAsText(file);
        },
        handleJsonFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.jsonFileData = JSON.parse(reader.result);
                this.customizeJson(this.jsonFileData.interchanges);
            };
            reader.readAsText(file);
        },
        handleTextFileEdit(event) {
            this.textFileContents = event.target.innerText;
            this.updateJsonFileData();
        },
        handleJsonFileEdit(event) {
            this.jsonFileData = JSON.parse(event.target.innerText);
            this.updateJsonFileData();
        },
        customizeJson(jsonData) {
            let customOBJ = {};
            let counter = 0;

            for (var i = 0; i <= jsonData.length; i++) {
                let tempObj = jsonData[i];
                if (typeof (tempObj) === "object") {
                    let objKey = Object.keys(tempObj)[0];
                    let objValue = Object.values(tempObj)[0];

                    for (const key in tempObj) {

                        if (!Array.isArray(tempObj[key])) {
                            customOBJ[key] = tempObj[key];
                        }
                        else if (Array.isArray(tempObj[key])) {
                            counter = 1;
                            let mixObj = {};
                            mixObj["key"] = objKey;
                            mixObj["value"] = Array.isArray(objValue) ? null : objValue;
                            mixObj["children"] = customOBJ;
                            mixObj['active'] = false;
                            if (!Array.isArray(objValue)) {

                                this.singleArray.push(mixObj);
                            }
                            this.customizeJson(tempObj[key])

                        }
                    }
                    if (counter !== 1) {

                        let mixObj = {};
                        mixObj["key"] = objKey;
                        mixObj["value"] = Array.isArray(objValue) ? null : objValue;
                        mixObj["children"] = customOBJ;
                        mixObj['active'] = false;
                        if (!Array.isArray(objValue)) {

                            this.singleArray.push(mixObj);
                        }
                    }
                }
            }
            console.log(this.singleArray)
        },
        updateJsonFileData() {
            const words = this.textFileContents.split("*");
            const data = {};
            for (const word of words) {
                let jsonArray = this.jsonFileData.interchanges;
                if (Array.isArray(jsonArray)) {
                    for (const arr of jsonArray) {
                        for (const key in arr) {
                            if (word === key) {
                                this.headerText = key;
                                this.bodyText = arr[key];
                                console.log(this.headerText, this.bodyText);
                            }
                            if (Object.prototype.hasOwnProperty.call(this.jsonFileData, key)) {
                                const value = this.jsonFileData[key];
                                if (value.includes(word)) {
                                    if (!Object.prototype.hasOwnProperty.call(data, key)) {
                                        data[key] = [];
                                    }
                                    data[key].push(value);
                                }
                            }
                        }
                    }
                }
            }
            this.jsonFileData = data;
        },
        toggleActive(index) {
            this.singleArray[index].active = !this.singleArray[index].active;
        },
        splitIntoWords(line) {
            const maxWidth = 60; // Maximum line width (adjust as needed)
            const words = line.split(/[*]/);
            const result = [];

            let currentLine = '';
            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                if ((currentLine + word).length <= maxWidth) {
                    currentLine += word + ' ';
                } else {
                    console.log(currentLine);
                    result.push(currentLine.trim());
                    currentLine = word;
                }
            }
            result.push(currentLine.trim());

            return result;
        },
        highlightLine(index) {
            const paragraph = this.$refs.line;
            for (const inText of paragraph) {
                const listIndex = inText.__vnode.key;
                if (index === listIndex) {
                    this.lineIndex = listIndex;
                    break;
                }
            }
        },
        removeLineHighlight() {
            this.lineIndex = '100';
        },
        highlightWord(lineindex, wordindex) {
            this.lineIndex = '100';
            const word = this.$refs.word;
            for (const inText of word) {
                const listIndex = inText.__vnode.key;
                if (wordindex === listIndex) {
                    this.wordIndex = listIndex;
                    this.lineWordIndex = lineindex;
                    break;
                }
            }
        },
        removeWordHighlight() {
            this.wordIndex = '100';
        },

    },
    computed: {
        words() {
            return this.textFileContents.split("*");
        },
        lines() {
            return this.textFileContents.split("~")
        },
    },
}
</script>
<style scoped>
.layoutContainer {
    min-width: 100%;
    min-height: 100%;
    overflow: hidden;
}

.mainContainer {
    background-color: rgb(40, 40, 80);
    padding-top: 5em;
}

.uploadNav {
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid gray;
}

.uploadButton {
    display: flex;
    justify-content: center;
    align-items: center;
}

.sectionContainer {
    min-width: 50%;
    min-height: 100%;
    display: flex;
}

.textContainer {
    width: 40%;
    min-width: 40%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* or adjust as needed */
}

.dropdownContainer {
    min-width: 60%;
    overflow-y: auto;
}

.bulletNumber {
    margin: 2px 10px 0px 10px;
    color: aliceblue;
    font-size: 12px;
    font-weight: 500;
}

.textWords {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 15px;
    color: white !important;
    letter-spacing: 1px;
}

</style>