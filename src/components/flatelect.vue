<style>
	#select-wrapper {
	  display: flex;
	  align-items: stretch;
	  position: relative;
	  font-family: inherit;
	}
	#select-wrapper.dropdownOn input {
	  border-bottom-left-radius: 0;
	  border-bottom-right-radius: 0;
	}
	#select-wrapper.dropdownOn i {
	  border-bottom-right-radius: 0;
	}
	#select-wrapper .select-filter {
	  overflow: hidden;
	  display: inline-flex;
	  width: 100%;
	  max-width: 100%;
	}
	#select-wrapper ul {
	  list-style: none;
	  margin: 0px;
	  padding: 0px;
	}
	#select-wrapper input {
	  -webkit-appearance: none;
	  background-color: white;
	  border: none;
	  box-shadow: none;
	  box-sizing: border-box;
	  padding: .6em;
	  font-weight: 200;
	  font-size: .85em;
	  display: flex;
	  width: 100%;
	  border: solid 1px rgba(0, 0, 0, 0.06);
	  outline: none;
	  border-radius: .15em;
	  z-index: 2;
	  border-radius: .15em;
	  /*     border-top-left-radius: .15em;
	  border-bottom-left-radius: .15em; */
	}
	#select-wrapper.compact {
	  width: 18em;
	}
	#select-wrapper.full {
	  width: 100%;
	}
	#select-wrapper .icon-wrapper {
	  height: 100%;
	  width: 2em;
	  box-sizing: border-box;
	  position: absolute;
	  top: 0;
	  right: 0;
	  display: flex;
	  align-items: center;
	  font-size: .85em;
	  padding: 0px .7em;
	  background-color: rgba(0, 0, 0, 0.03);
	  border-top-right-radius: .15em;
	  border-bottom-right-radius: .15em;
	  height: 100%;
	  z-index: 2;
	  box-sizing: border-box;
	}
	#select-wrapper .icon-wrapper > span {
	  position: absolute;
	  top: 0;
	  right: 0;
	  left: 0;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 100%;
	}
	#select-wrapper .icon-wrapper .box {
	  width: 1em;
	  height: 1em;
	  box-sizing: content-box;
	  border-left: solid 1px;
	  border-top: solid 1px;
	  transform: rotate(225deg) translate3d(0.15em, 0.15em, 0) scale(0.6);
	}
	#select-wrapper .icon-wrapper span.moveup > div.box {
	  transform: rotate(225deg) translate3d(0.3em, 0.3em, 0) scale(0.6);
	}
	#select-wrapper .icon-wrapper span.x > div.box {
	  transform: rotate(45deg) translate3d(0.3em, 0.3em, 0) scale(0.6);
	}
	#select-wrapper #options {
	  max-height: 250px;
	  box-sizing: border-box;
	  z-index: 30;
	  width: 100%;
	  position: absolute;
	  left: 0;
	  overflow-y: scroll;
	  -webkit-overflow-scrolling: touch;
	  top: 100%;
	  background-color: white;
	  border-bottom-left-radius: .15em;
	  border-bottom-right-radius: .15em;
	  border: solid 1px rgba(0, 0, 0, 0.04);
	  border-top: none;
	}
	#select-wrapper #options li {
	  cursor: pointer;
	}
	#select-wrapper #options li p {
	  font-size: .8em;
	  margin: 0px;
	  padding: .6em .6em;
	}
	#select-wrapper #options li p:hover, #select-wrapper #options li p.keyboardHover {
	  background-color: rgba(0, 0, 0, 0.02);
	}
	#select-wrapper #options li p.heading {
	  background-color: rgba(0, 0, 0, 0.02);
	  padding: .4em .6em;
	  text-align: center;
	  font-size: .7em;
	}
	#select-wrapper #options li p.heading:hover {
	  background-color: rgba(0, 0, 0, 0.02);
	}
	@supports (-webkit-backdrop-filter: blur(3px)) {
	  #select-wrapper.fancy #options {
	    background-color: rgba(255, 255, 255, 0.95);
	    -webkit-backdrop-filter: blur(3px);
	  }
	}
	@supports not (-webkit-backdrop-filter: blur(3px)) {
	  #select-wrapper.fancy #options {
	    box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.06);
	  }
	}
	@media screen and (max-width: 780px) {
	  #select-wrapper input {
	    overflow-x: hidden;
	    font-size: 4vw;
	  }
	  #select-wrapper li {
	    font-size: 4.5vw;
	  }
	  #select-wrapper p {
	    padding: .9em .9em;
	  }
	  #select-wrapper #options {
	    overflow-x: hidden;
	  }
	}
</style>
<template>
	<div :class="[{'dropdownOn' : !!dropdown, 'fancy': !!fancy}, size]" id="select-wrapper" @mouseleave="close()" @keydown="keymonitor">
	    <div class="select-filter" @click="focusInput()">
	        <input ref="searchInput" @focus="focusInput()" placeholder="Select an option..." type="text" v-model="inputValue" v-show="!noInput" @keyup="searching()" :required="required" />
	    </div>
	    <span class="icon-wrapper" @click="focusInput('icon')">
	        <span class="down" :class="{'moveup': !!dropdown}"><div class="box"></div></span>
	        <span class="x" v-if="!!dropdown"><div class="box"></div></span>
	    </span>
	    <div id="options" v-if="!!dropdown && !!options">
	        <ul v-if="options.length > 0">
	            <li @click="select(option)" v-for="(option, index) in filteredOptions" :id="'option' + index">
	                <p :class="{'heading': option == option.toUpperCase(), 'keyboardHover': option === keyboardSelection}">
	                    <span v-if="custom === false">
	                        {{option}}
	                    </span>
	                    <span v-else>
	                        <slot></slot>
	                    </span>
	                </p>
	            </li>
	        </ul>
	        <ul v-else><p>There are no options to be shown.</p></ul>
	    </div>
	</div>
</template>
<script>
	export default {
	  props: {
	    options: {
	      type: Array,
	      required: false,
	      default: null,
	    },
	    objkey: {
	      type: String,
	      required: false,
	      default: null,
	    },
	    size: {
	      type: String,
	      required: false,
	      default: 'full',
	    },
	    fancy: {
	      type: Boolean,
	      required: false,
	      default: false,
	    },
	    required: {
	      type: Boolean,
	      required: false,
	      default: false,
	    },
	    custom: {
	      type: Boolean,
	      required: false,
	      default: false,
	    },
	  },
	  data() {
	    return {
	      noInput: false,
	      inputValue: null,
	      searchValue: null,
	      dropdown: false,
	      keyboardSelection: null,
	    };
	  },
	  methods: {
	    select(option) {
	      this.inputValue = option;
	      this.searchValue = null;
	      this.close();
	      this.$emit('selected', option);
	    },
	    focusInput(forceClose) {
	      if (forceClose === 'icon' && !!this.dropdown) {
	        this.close();
	      } else {
	        let ua = navigator.userAgent;
	        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
	          this.$refs.searchInput.focus();
	        }
	        this.dropdown = true;
	        if (this.inputValue !== null) {
	          this.keyboardSelection = this.inputValue;
	          let index = this.filteredOptions.indexOf(this.inputValue);
	          this.$nextTick(() => {
	            let optionsDiv = document.getElementById('options');
	            let selectedEl = document.getElementById('option' + index);
	            if (selectedEl.offsetTop > 150) {
	              optionsDiv.scrollTop = selectedEl.offsetTop - 150;
	            } else if (selectedEl.offsetTop < 100) {
	              optionsDiv.scrollTop = 0;
	            }
	          });
	        }
	      }
	    },
	    close() {
	      this.dropdown = false;
	      this.$refs.searchInput.blur();
	    },
	    keymonitor(event) {

	      let index = this.filteredOptions.indexOf(this.keyboardSelection);
	      let myElement;
	      let topPos;
	      let scrollingDiv = document.getElementById('options');

	      if (event.key === 'Enter') {
	        this.select(this.keyboardSelection);
	      } else if (event.key === 'up' || event.key === 'ArrowUp') {
	        if (index > 0) {
	          this.keyboardSelection = this.filteredOptions[index - 1];
	          myElement = document.getElementById('option' + index);
	          topPos = myElement.offsetTop;
	          if (topPos > 150) {
	            scrollingDiv.scrollTop = topPos - 150;
	          } else if (topPos < 100) {
	            scrollingDiv.scrollTop = 0;
	          }
	        } else if (index === -1) {
	          this.keyboardSelection = this.filteredOptions[0];
	        }
	      } else if (event.key === 'down' || event.key === 'ArrowDown') {
	        if (index < this.filteredOptions.length) {
	          if (index === -1) {
	            this.keyboardSelection = this.filteredOptions[0];
	          } else {
	            this.keyboardSelection = this.filteredOptions[index + 1];
	            myElement = document.getElementById('option' + index);
	            topPos = myElement.offsetTop;
	            if (topPos > 150) {
	              scrollingDiv.scrollTop = topPos - 100;
	            }
	          }

	        }
	      }
	    },
	    searching() {
	      if (event.key !== 'Enter' && event.key !== 'up' && event.key !== 'ArrowUp' && event.key !== 'down' && event.key !== 'ArrowDown') {
	        this.searchValue = this.inputValue;
	      }
	    }
	  },
	  computed: {
	    filteredOptions() {
	      if (this.searchValue !== null && this.searchValue.length > 0) { // if options are being filtered
	        if (this.objkey !== null) { //    check if objkey exists
	          return this.options.filter((option) => { //    if true filter with option.objkey
	            return option[this.objkey].toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1;
	          });
	        } else { //    if false filter with plain option element
	          return this.options.filter((option) => {
	            return option.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1;
	          });
	        }
	      }
	      return this.options; // if options are not being
	    }, // filtered, return whole array
	  },
	};
</script>
