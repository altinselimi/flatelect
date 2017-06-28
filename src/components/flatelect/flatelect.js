/* ============
 * VSelect Component
 * ============
 *
 * todo: add documentation here!
 */

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
    }
  },
  data() {
    return {
      noInput: false,
      inputValue: null,
      searchValue: null,
      dropdown: false,
      keyboardSelection: null,
    }
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

