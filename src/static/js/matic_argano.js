
$(function() {
    consoleInit(main)
      });
    


    async function main() {

      const graphUrl =
      "https://api.thegraph.com/subgraphs/name/r312r0/vlad-ago-subgraph";
    
      const graphQuery = `
      {
        uniswapFactory(id: "0xdac31e70c2c4fea0629e85e7b67222127a8672d8") {
          id
          totalValueLocked(first: 1, orderBy: timestamp, orderDirection: desc) {
            value
          }
        }
      }
    `;


    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ graphQuery })
    };

  const rez = await fetch(graphUrl, opts);
  const rezz = await rez.json();
  console.log(rezz)

  //const { uniswapFactory } = await request(graphUrl, graphQuery);


  //const balance = Math.round(uniswapFactory.totalValueLocked[0].value)






      
    
        hideLoading();
      }
    