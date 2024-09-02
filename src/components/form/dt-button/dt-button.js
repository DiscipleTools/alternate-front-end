import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtBase from '../../dt-base.js';

export class DtButton extends DtBase {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        width: fit-content;
        height: fit-content;
      }

      .dt-button {
        cursor: pointer;
        display: flex;
        margin: 5px;
        padding: var(--dt-button-padding-y, 10px)
          var(--dt-button-padding-x, 10px);
        font-family: var(--dt-button-font-family);
        font-size: var(--dt-button-font-size, 14px);
        line-height: var(--dt-button-line-height, inherit);
        font-weight: var(--dt-button-font-weight, 700);
        background-color: var(
          --dt-button-context-background-color,
          var(--dt-button-background-color)
        );
        border: var(--dt-button-border-width, 1px) solid
          var(--dt-button-context-border-color, var(--dt-button-border-color));
        border-radius: var(--dt-button-border-radius, 10px);
        box-shadow: var(
          --dt-button-box-shadow,
          --dt-button-context-box-shadow(0 2px 4px rgb(0 0 0 / 25%))
        );
        color: var(--dt-button-context-text-color, var(--dt-button-text-color));
        text-rendering: optimizeLegibility;
        gap: var(--dt-button-gap, 10px);
        justify-content: var(--dt-button-justify-content, center);
        align-content: var(--dt-button-align-content, center);
        align-items: var(--dt-button-align-items, center);
        text-decoration: var(
          --dt-button-text-decoration,
          var(--dt-button-context-text-decoration, none)
        );
        text-transform: var(--dt-button-text-transform, none);
        letter-spacing: var(--dt-button-letter-spacing, normal);
        width: var(--dt-button-width, 100%);
        height: var(--dt-button-height, auto);
        aspect-ratio: var(--dt-button-aspect-ratio, auto);
        position: relative;
      }

      .dt-button.dt-button--outline {
        background-color: transparent;
        color: var(--dt-button-context-text-color, var(--text-color-inverse));
      }

      .dt-button--primary:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--primary-color);
        --dt-button-context-background-color: var(--primary-color);
        --dt-button-context-text-color: var(--dt-button-text-color-light);
      }

      .dt-button--link:not(.dt-button--outline) {
        --dt-button-context-text-decoration: underline;
        --dt-button-context-box-shadow: none;
        --dt-button-context-border-color: transparent;
        --dt-button-context-background-color: transparent;
        --dt-button-context-text-color: var(--dt-button-text-color-dark);
      }

      .dt-button--alert:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--alert-color);
        --dt-button-context-background-color: var(--alert-color);
        --dt-button-context-text-color: var(--dt-button-text-color-light);
      }

      .dt-button--caution:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--caution-color);
        --dt-button-context-background-color: var(--caution-color);
        --dt-button-context-text-color: var(--dt-button-text-color-dark);
      }

      .dt-button--success:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--success-color);
        --dt-button-context-background-color: var(--success-color);
        --dt-button-context-text-color: var(--dt-button-text-color-light);
      }

      .dt-button--inactive:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--inactive-color);
        --dt-button-context-background-color: var(--inactive-color);
        --dt-button-context-text-color: var(--dt-button-text-color-light);
      }

      .dt-button--disabled:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--disabled-color);
        --dt-button-context-background-color: var(--disabled-color);
        --dt-button-context-text-color: var(--dt-button-text-color-dark);
      }

      .dt-button--primary.dt-button--outline {
        --dt-button-context-border-color: var(--primary-color);
        --dt-button-context-text-color: var(--primary-color);
      }

      .dt-button--alert.dt-button--outline {
        --dt-button-context-border-color: var(--alert-color);
        --dt-button-context-text-color: var(--alert-color);
      }

      .dt-button--caution.dt-button--outline {
        --dt-button-context-border-color: var(--caution-color);
        --dt-button-context-text-color: var(--caution-color);
      }

      .dt-button--success.dt-button--outline {
        --dt-button-context-border-color: var(--success-color);
        --dt-button-context-text-color: var(--success-color);
      }

      .dt-button--inactive.dt-button--outline {
        --dt-button-context-border-color: var(--inactive-color);
      }

      .dt-button--disabled.dt-button--outline {
        --dt-button-context-border-color: var(--disabled-color);
      }

      .dt-button.dt-button--rounded {
        --dt-button-border-radius: 50%;
        --dt-button-padding-x: 0px;
        --dt-button-padding-y: 0px;
        --dt-button-aspect-ratio: var(--dt-button-rounded-aspect-ratio, 1/1);
      }

      .dt-button--custom {
        padding: var(--dt-button-padding-y, 7px)
          var(--dt-button-padding-x, 10px);
        font-size: var(--dt-button-font-size, 12px);
        font-weight: var(--dt-button-font-weight, 300);
        border-radius: var(--dt-button-border-radius, 5px);
      }

      .dt-button--star {
      --dt-button-background-color: transparent;
      --dt-button-border-color: transparent;
      padding: 0;
    }
      ::slotted(svg) {
        margin: 2px !important;
        vertical-align: middle !important;
      }

      button.toggle {
        margin-inline-end: 0;
        margin-inline-start: auto;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      context: { type: String },
      type: { type: String },
      outline: { type: Boolean },
      href: { type: String },
      title: { type: String },
      onClick: { type: Function },
      rounded: { type: Boolean },
      confirm: { type: String },
      buttonClass: { type: String },
      custom:  { type: Boolean },
      favorite: { type: Boolean, reflect: true },
    };
  }

  get classes() {
    const classes = {
      'dt-button': true,
      'dt-button--outline': this.outline,
      'dt-button--rounded': this.rounded,
      'dt-button--custom': this.custom,
    };
    const contextClass = `dt-button--${this.context}`;
    classes[contextClass] = true;
    return classes;
  }

  constructor() {
    super();
    this.context = 'default';
    this.favorite = false; // Initialize with a default value
  }

  connectedCallback() {
    // Code that runs after the component's initial render
    super.connectedCallback();
    if (this.id === 'favorite-button') {
      window.addEventListener('load', async () => {
        this.loading = true;
      const event = await new CustomEvent('dt:get-data', {
        bubbles: true,
        detail: {
          field: this.id,
          postType: this.postType,
          onSuccess: result => {
            this.favorite = result; // Updated state
            const slot = this.shadowRoot.querySelector('slot');
            const slottedElements = slot.assignedNodes({ flatten: true });
            const svg = slottedElements.find(node =>
             node.nodeType === Node.ELEMENT_NODE && node.classList.contains('icon-star')
           );
           if(this.favorite && this.favorite) {
              svg.classList.add('selected'); // Add the class
           } else {
             svg.classList.remove('selected'); // Remove the class
           }
            this.requestUpdate();
          },
          onError: error => {
            console.warn(error);
          },
        },
      });
      this.dispatchEvent(event);
    })
   }

  }

  handleClick(e) {
    e.preventDefault();
      if (this.confirm) {
      if (!confirm(this.confirm)) {
        e.preventDefault();
        return;
      }
    }
    if (this.onClick) {
      e.preventDefault();
      // if (this.id === 'favorite-button') {
        this.onClick(e);
      // }
    } else {
      const form = this.closest('form');
      if (form) {
        form.submit();
      }
    }
  }


  onClick(e){
    e.preventDefault();
    if (this.id === 'favorite-button') {
     const event = new CustomEvent('click', {
      detail: {
        field: this.id,
        favorite: !this.favorite,
      }
    });
    this.favorite = !this.favorite;
    // this.value = this.favorite ? 'favourited': 'not favourited';
       const slot = this.shadowRoot.querySelector('slot');
       const slottedElements = slot.assignedNodes({ flatten: true });
       const svg = slottedElements.find(node =>
        node.nodeType === Node.ELEMENT_NODE && node.classList.contains('icon-star')
      );
       if (svg) {
        if (svg.classList.contains('selected')) {
          svg.classList.remove('selected'); // Remove the class
        } else {
          svg.classList.add('selected'); // Add the class
        }
       };
      this.dispatchEvent(event);
      this.requestUpdate();
    }
    };



  _dismiss() {
    this.hide = true;
  }

  render(e) {
    if (this.hide) {
      return html``;
    }

    const buttonClasses = {
      ...this.classes,
      // 'selected': this.favorite,
    };

    // this.value = this.favorite ? 'favourited': 'not favourited';
    if (this.href) {
      return html`
        <a
          name=${this.name}
          class=${classMap(buttonClasses)}
          href=${this.href}
          title=${this.title}
          type=${this.type}
          @click=${this.handleClick}
        >
          <div>
            <slot></slot>
          </div>
        </a>
      `;
    }
    return html`

      <button
        class=${classMap(buttonClasses)}
        title=${this.title}
        type=${this.type}
        .value=${this.value}
        @click=${this.handleClick}
      >
        <div>
          <slot></slot>
        </div>
      </button>
    `;
  }
}

window.customElements.define('dt-button', DtButton);
