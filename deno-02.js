const param1 = Deno.args[0];


console.log('You param is ', param1);


setTimeout(() => {
  console.log('Helllloooo');
  console.table(Deno.metrics());
}, 2000);