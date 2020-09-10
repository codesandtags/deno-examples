const firstName = Deno.args[0] && Deno.args[0].toLowerCase();
const lastName = Deno.args[1] && Deno.args[1].toLowerCase();

if (firstName === 'edwin' && lastName === 'torres') {
    console.log(`😎 Welcome ${firstName} ${lastName}!`);
} else {
    console.log('You need to define the arguments.');
}
