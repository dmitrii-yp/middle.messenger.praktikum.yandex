import Block from '../../utils/block';

export class TestPage extends Block {
  constructor(props: {}) {
    super({ ...props, onClick: () => console.log('click') });
  }

  render() {
    return `
      <div class='flex h-screen items-center justify-center'>
        <div class='w-[340px] rounded-lg bg-dark2 px-7 py-3 shadow-2xl'>
          {{{H1 header='sign_in'}}}
          <form class='mt-12'>
            {{{InputText label='Login' inputName='login'}}}
            {{{InputText label='Password' inputName='password' inputType='password'}}}
            {{{SubmitButton label='Sign In' onClick=onClick}}}
          </form>
          <div class='text-center mt-2'>
            {{{TextButton label='Create account' href='/src/pages/sign-up/sign-up.hbs'}}}
          </div>
        </div>
      </div>
    `;
  }
}
