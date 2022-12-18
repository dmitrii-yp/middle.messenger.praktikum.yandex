import Block from '../../utils/block';

interface InputTextProps {
  label: string;
  inputName: string;
  inputType: string;
  value?: string;
}

export class InputText extends Block {
  constructor(props: InputTextProps) {
    super(props);
  }

  static get componentName() {
    return 'InputText';
  }

  render() {
    return `
      <div class='relative mb-12'>
        <input
          class='block w-full appearance-none border-b-2 border-purple2 bg-transparent pb-[2px] font-monospace text-sm font-normal text-white placeholder-gray-400 invalid:border-red0 invalid:text-red0 focus:border-b-4 focus:p-0 focus:placeholder-transparent focus:outline-none focus:invalid:border-red0 focus:invalid:text-red0'
            {{#if inputType}}
            type={{inputType}}
            {{else}}
            type='text'
            {{/if}}
            {{#if value}}
            value={{value}}
            {{/if}}
          placeholder=' '
          id={{inputName}}
          name={{inputName}}
        />
        <label
          class='absolute top-0 origin-0 font-monospace text-sm text-gray-400 duration-300 invalid:text-red0'
          for='{{inputName}}'
        >{{label}}</label>
        <div class='absolute font-monospace text-xs text-red0 mt-[2px] invisible'>Wrong email</div>
      </div>
    `;
  }
}
