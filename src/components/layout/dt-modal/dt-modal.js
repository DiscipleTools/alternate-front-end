import { html, css } from 'lit';
import { msg } from '@lit/localize';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import DtBase from '../../dt-base.js';

export class DtModal extends DtBase {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-family);
      }
      :host:has(dialog[open]) {
        overflow: hidden;
      }

      .dt-modal {
        display: block;
        background: var(--dt-modal-background-color, #fff);
        color: var(--dt-modal-color, #000);
        max-inline-size: min(90vw, 100%);
        max-block-size: min(80vh, 100%);
        max-block-size: min(80dvb, 100%);
        margin: auto;
        height: fit-content;
        padding: var(--dt-modal-padding, 1em);
        position: fixed;
        inset: 0;
        border-radius: 1em;
        border: none;
        box-shadow: var(--shadow-6);
        z-index: 1000;
        transition: opacity 0.1s ease-in-out;
      }
      .dt-modal.dt-modal--width {
        max-width: 80rem;
        width: 600px;
        background-color: #fefefe;
        border: 1px solid #cacaca;
        border-radius: 10px;
      }
      #modal-field-title {
      font-size: 2rem;
      }

      dialog:not([open]) {
        pointer-events: none;
        opacity: 0;
      }

      dialog::backdrop {
        background: var(--dt-modal-backdrop-color, rgba(0, 0, 0, 0.25));
        animation: var(--dt-modal-animation, fade-in 0.75s);
      }

      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 1.4;
        text-rendering: optimizeLegibility;
        color: inherit;
        font-style: normal;
        font-weight: 300;
        margin: 0;
      }

      form {
        display: grid;
        height: fit-content;
        grid-template-columns: 1fr;
        grid-template-rows: 52px auto 50px;
        grid-template-areas:
          'header'
          'main'
          'footer';
        position: relative;
      }

      form.no-header {
        grid-template-rows: auto auto;
        grid-template-areas:
          'main'
          'footer';
      }

      header {
        grid-area: header;
        display: flex;
        justify-content: space-between;
      }

      .button {
        color: var(--dt-modal-button-color, #fff);
        background: var(--dt-modal-button-background, #3f729b);
        font-size: 1rem;
        border: 0.1em solid var(--dt-modal-button-background, #000);
        border-radius: 0.25em;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        text-decoration: none;
      }
      .button.opener {
        color: var(--dt-modal-button-opener-color,var(--dt-modal-button-color, #fff) );
        background: var(--dt-modal-button-opener-background, var(--dt-modal-button-background, #3f729b) );
        border: 0.1em solid var(--dt-modal-button-opener-background, #000);
      }
      button.toggle {
        margin-inline-end: 0;
        margin-inline-start: auto;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        align-items: flex-start;
      }

      article {
        grid-area: main;
        overflow: auto;
      }

      footer {
        grid-area: footer;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 18px;
        border-top: 1px solid #ccc;
      }

      .help-more h5 {
        font-size: 0.75rem;
        display: block;
      }
      .help-more .button {
        font-size: 0.75rem;
        display: block;
      }
      .help-icon {
        -webkit-filter: invert(69%) sepia(1%) saturate(0) hue-rotate(239deg) brightness(94%) contrast(86%);
        filter: invert(69%) sepia(1%) saturate(0) hue-rotate(239deg) brightness(94%) contrast(86%);
        height: 15px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      context: { type: String },
      isHelp: { type: Boolean },
      isOpen: { type: Boolean },
      hideHeader: { type: Boolean },
      hideButton: { type: Boolean },
      buttonClass: { type: Object },
      buttonStyle: { type: Object },
      imageSrc: {type: String},
      imageStyle: {type:Object},
      tileLabel: {type:String},
      buttonLabel:{type: String},
    };
  }

  constructor() {
    super();
    this.context = 'default';
    this.addEventListener('open', () => this._openModal());
    this.addEventListener('close', () => this._closeModal());
  }

  _openModal() {
    this.isOpen = true;
    this.shadowRoot.querySelector('dialog').showModal();

    document.querySelector('body').style.overflow = "hidden"
  }
// to format title coming from backend

  get formattedTitle() {
    if (!this.title) return '';
    return this.title.charAt(0).toUpperCase() + this.title.slice(1);
  }

  _dialogHeader(svg) {
    if (!this.hideHeader) {
      return html`
      <header>
            <h1 id="modal-field-title" class="modal-header">${this.formattedTitle}</h1>
            <button @click="${this._cancelModal}" class="toggle">${svg}</button>
          </header>
      `;
    }
    return html``;
  }

  _closeModal() {
    this.isOpen = false;
    this.shadowRoot.querySelector('dialog').close();
    document.querySelector('body').style.overflow = "initial"
  }

  _cancelModal() {
    this._triggerClose('cancel');
  }

  _triggerClose(action) {
    this.dispatchEvent(new CustomEvent('close', {
      detail: {
        action,
      },
    }));
  }

  _dialogClick(e) {
    if (e.target.tagName !== 'DIALOG') {
      // This prevents issues with forms
      return;
    }

    // Close the modal if the user clicks outside of the modal
    const rect = e.target.getBoundingClientRect();

    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (clickedInDialog === false) {
      this._cancelModal();
    }
  }

  _dialogKeypress(e) {
    if (e.key === 'Escape') {
      this._cancelModal();
    }
  }

  _helpMore() {
    return this.isHelp
      ? html`
          <div class="help-more">
            <h5>${msg('Need more help?')}</h5>
            <a
              class="button small"
              id="docslink"
              href="https://disciple.tools/user-docs"
              target="_blank"
              >${msg('Read the documentation')}</a
            >
          </div>
        `
      : null;
  }

  firstUpdated() {
    if (this.isOpen) {
      this._openModal();
    }
  }

  _onButtonClick() {
    this._triggerClose('button');
  }

  render() {
    // prettier-ignore
    const svg = html`
      <svg viewPort="0 0 12 12" version="1.1" width='12' height='12'>
          xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="11"
              x2="11" y2="1"
              stroke="currentColor"
              stroke-width="2"/>
        <line x1="1" y1="1"
              x2="11" y2="11"
              stroke="currentColor"
              stroke-width="2"/>
      </svg>
    `;
    return html`
      <dialog
        id=""
        class="dt-modal dt-modal--width"
        @click=${this._dialogClick}
        @keypress=${this._dialogKeypress}
      >
        <form method="dialog" class=${this.hideHeader ? "no-header" : ""}>
      ${this._dialogHeader(svg)}
          <article>
            <slot name="content"></slot>
          </article>
          <footer>
            <button
              class="button small"
              data-close=""
              aria-label="Close reveal"
              type="button"
              @click=${this._onButtonClick}
            >
              <slot name="close-button">${msg('Close')}</slot>
            </button>
            ${this._helpMore()}
          </footer>
        </form>
      </dialog>

      ${!this.hideButton
      ? html`
      <button
        class="button small opener ${classMap(this.buttonClass || {})}"
        data-open=""
        aria-label="Open reveal"
        type="button"
        @click="${this._openModal}"
        style=${styleMap(this.buttonStyle || {})}
      >
      ${this.buttonLabel
      ?html`${this.buttonLabel}`:''}
       ${this.imageSrc
                ? html`<img
                    src="${this.imageSrc}"
                    alt="${this.buttonLabel} icon"
                    class="help-icon"
                    style=${styleMap(this.imageStyle || {})}
                  />`
                : ''}
      </button>
      ` : null}
    `;
  }
}

window.customElements.define('dt-modal', DtModal);
