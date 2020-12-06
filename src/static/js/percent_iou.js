$(function() {
    consoleInit();
    start(main);
  });


async function main() {   
    const App = await init_ethers();
    const signer = App.provider.getSigner();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    const claimAddress = "0xA742Ce2E4426290017ab165b0F7d8Ab131E4a9f5";
    const distributor = new ethers.Contract(claimAddress, CORNICHON_ABI, signer);
    let claimInfo = merkle.claims[App.YOUR_ADDRESS];
    if (!claimInfo) {
        _print("You have not been allocated any PercentIOU.");
        return;
    }

    let index = claimInfo.index;
    let amount = claimInfo.amount;
    let amountDisplay = ethers.BigNumber.from(claimInfo.amount) / 1e18;
    let proof = claimInfo.proof;
    _print(`Total PercentIOU: ${amountDisplay}`);
    
    let claimed = await distributor.isClaimed(index);
    if (claimed === true) {
        _print(`You have claimed your allocated PercentIOU.`);
    }
    else {            
        const claim = async function() {
            return await distributor.claim(index, App.YOUR_ADDRESS, amount, proof)
        }
        _print_link(`\nClaim ${amountDisplay} PercentIOU`, claim);
    }
}

const merkle = {
    "merkleRoot": "0xab63945a51b4e1a5a114049096f4eaaaa46db1d2925021cd3167c317f9548296",
    "tokenTotal": "0xb848ea1a883a8c4d3000",
    "claims": {
      "0xA4f2b2557D78E31D48E1ffa8AF8b25Db8524Ea3c": {
        "index": 0,
        "amount": "0x1605d9ee98627100000",
        "proof": [
          "0xd8ac4f84119f90e1f4a0821e90783d1b40145cbb12f394d5ea5e7eb6a5fba1f2",
          "0xe06c1b993fc36240a16252518216f5da3999367392cf159818c0f5a3667c8278",
          "0xcfca20d5301531785813514a1db73fba70c094e8c7a9a30c6a7f985929903efd",
          "0x7154da0619a73ba6031db7513e59db2f911cf0768140fd93ff0ff9a1ba9d24e3",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0xF85385347F56819C316939434d427d0c9537EDdc": {
        "index": 1,
        "amount": "0x995d2990c84bb7600",
        "proof": [
          "0x2a6bd9014ac8bdb063c6a9ad948514be41f252f7a6bde4447a39aec7462e86dd",
          "0x2dcf1bc6e2d438d6a063a11a1ef8fa83da1f590489abc10128ac4cb342a0b11a",
          "0xda7196757cda7920e203c27e09c7b20f934b0b50d328980739cedc573b2dc65b",
          "0x4b21374d7d772a690b2c9153de379a0251b3ee1bb9761b26e2388ebbe9c7138a",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x14f3310f600f7A719bA365f15d330FF7502F792C": {
        "index": 2,
        "amount": "0x1afe5b2543c7ede280",
        "proof": [
          "0xb7ce9c30c2f1b3cf30797086f9315fc22bcc4370c2d417b061d42da53067d804",
          "0xa81eb8a0cf9f13d24204e18ba930666269d15e48c5508d58e653f68c2c4a4a4b",
          "0x9ac4f6ea0e0b2922968e517b874efb0d622d2bf0b71a90d01ec7a1d67c52408f",
          "0x7154da0619a73ba6031db7513e59db2f911cf0768140fd93ff0ff9a1ba9d24e3",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x1A90FE22c75A419b4747101a39027b51393c1178": {
        "index": 3,
        "amount": "0x23be18d5e6e384dd80",
        "proof": [
          "0xb83dcc63494bf5132e5bd824e3b7f2852be91966aecde9efaab9b74b00036145",
          "0x4bc07efc29cf1d9a5db48ebf9a0a01c1f743428067055e9f83c56aad4d16d77f",
          "0xcfca20d5301531785813514a1db73fba70c094e8c7a9a30c6a7f985929903efd",
          "0x7154da0619a73ba6031db7513e59db2f911cf0768140fd93ff0ff9a1ba9d24e3",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x493374100e511b1b091fa5bace1929dc154fee80": {
        "index": 4,
        "amount": "0x36b62847c3aafd0000",
        "proof": [
          "0x010b6a5558ecd6c9c664e9ad6bc48ad465e43fa178c4b42bd456a861226119e8",
          "0x16e8a57d5408083f6862b41d1db82b3556343da4859b5d3ae92372bb862baef3",
          "0xda7196757cda7920e203c27e09c7b20f934b0b50d328980739cedc573b2dc65b",
          "0x4b21374d7d772a690b2c9153de379a0251b3ee1bb9761b26e2388ebbe9c7138a",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0xAA98c7aFABbC0EA3aCdc029A9D71b9Ac83fF8cef": {
        "index": 5,
        "amount": "0x6f21739b9a6c6e1800",
        "proof": [
          "0xec5076e0d8367351b2a12faa6c9bb5ba98c7cadcdcf27ce098b7a0de6a3bd53e",
          "0x66d25b2c3ee67de5b1759108ecceca7e6c5190f92c3f2eaac4d9e621cb0a16cb"
        ]
      },
      "0x1ba6B82641C77aB1Fc7Bc734C5C3628199A8967D": {
        "index": 6,
        "amount": "0xb5c2dc67652e56ba80",
        "proof": [
          "0xa714c03310b298d2425326d803062d71a765610fa257b57a6fee6f4450fa0c16",
          "0x697e1c44002cef892d45733aff715a3fd4a69a3d6f7dd83236f6645f5d81dea1",
          "0x9ac4f6ea0e0b2922968e517b874efb0d622d2bf0b71a90d01ec7a1d67c52408f",
          "0x7154da0619a73ba6031db7513e59db2f911cf0768140fd93ff0ff9a1ba9d24e3",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0xe1ad30971b83c17e2a24c0334cb45f808abebc87": {
        "index": 7,
        "amount": "0x21bdca2acfe44785280",
        "proof": [
          "0xeb4364c17536b8593bf05dd632e285a623b95041fd4c889f90825d32d3dab05b",
          "0x66d25b2c3ee67de5b1759108ecceca7e6c5190f92c3f2eaac4d9e621cb0a16cb"
        ]
      },
      "0x96FEb7b6F808dd2BBd09c9E5ccdE77caBd58d019": {
        "index": 8,
        "amount": "0x21e4dde9241f483cb00",
        "proof": [
          "0x0c035b270a5bf6fe3598ed36d8dc40830d55d485b0673bf3ba0586fbc6bc866a",
          "0x16e8a57d5408083f6862b41d1db82b3556343da4859b5d3ae92372bb862baef3",
          "0xda7196757cda7920e203c27e09c7b20f934b0b50d328980739cedc573b2dc65b",
          "0x4b21374d7d772a690b2c9153de379a0251b3ee1bb9761b26e2388ebbe9c7138a",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x08Fc3eFd10a7003729FE5D69521757472511b1A0": {
        "index": 9,
        "amount": "0x2655d1014e453c00000",
        "proof": [
          "0x5cc36ab10d92769ea1281e9556e2edf0208cf745b0f3d9d18a431c712c729c6e",
          "0xff69bdb09fd57ce6e4bb99e1e9f38b1d3d59dc7413820b0c97e27931347c2605",
          "0x02092b1880aa2acfd12bf5797cb11a0656ecbcc8c2b35663e62e80a462a80d7d",
          "0x4b21374d7d772a690b2c9153de379a0251b3ee1bb9761b26e2388ebbe9c7138a",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0xda248cC10b477C1144219183EC87b0621DAC37b3": {
        "index": 10,
        "amount": "0x344d8c545fb99430b00",
        "proof": [
          "0x5e027fa74c3aba197e66874b38c0da86e5da5654da940b020cbf240aa3be1c62",
          "0xff69bdb09fd57ce6e4bb99e1e9f38b1d3d59dc7413820b0c97e27931347c2605",
          "0x02092b1880aa2acfd12bf5797cb11a0656ecbcc8c2b35663e62e80a462a80d7d",
          "0x4b21374d7d772a690b2c9153de379a0251b3ee1bb9761b26e2388ebbe9c7138a",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x82020EAA71389c1d5855de78e2ab52c090327f2e": {
        "index": 11,
        "amount": "0x6e4e967be89b261ad00",
        "proof": [
          "0x875339b9de084a76faa51902725dac9982f6457b32775f8bc9a03bee8b1a165a",
          "0x6aaf6e7dbf434622b5918626577c944db7f369131053e65a49f511a4065e3eb5",
          "0x02092b1880aa2acfd12bf5797cb11a0656ecbcc8c2b35663e62e80a462a80d7d",
          "0x4b21374d7d772a690b2c9153de379a0251b3ee1bb9761b26e2388ebbe9c7138a",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x14F7bF19d07af4Bb0B76e7368AFfE9B756f47aA2": {
        "index": 12,
        "amount": "0x7931822204667c85d00",
        "proof": [
          "0xae0cfc79a1acfb87b12c51a85413b7e6d1b4f86041201ac9c5312fad3e623012",
          "0xa81eb8a0cf9f13d24204e18ba930666269d15e48c5508d58e653f68c2c4a4a4b",
          "0x9ac4f6ea0e0b2922968e517b874efb0d622d2bf0b71a90d01ec7a1d67c52408f",
          "0x7154da0619a73ba6031db7513e59db2f911cf0768140fd93ff0ff9a1ba9d24e3",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x0489076A0D17394835aF93cd62ACFf703B6814a9": {
        "index": 13,
        "amount": "0xda760c83a83c5d04b00",
        "proof": [
          "0xd02b8b8ad5cc336cdc6391003c649d0919a90eb7a24659092ce6ff45950926d2",
          "0x4bc07efc29cf1d9a5db48ebf9a0a01c1f743428067055e9f83c56aad4d16d77f",
          "0xcfca20d5301531785813514a1db73fba70c094e8c7a9a30c6a7f985929903efd",
          "0x7154da0619a73ba6031db7513e59db2f911cf0768140fd93ff0ff9a1ba9d24e3",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0xFb626333099A91Ab677BCd5e9C71bc4Dbe0238a8": {
        "index": 14,
        "amount": "0xe11a69cf85ae3270800",
        "proof": [
          "0x4ade5bce15a5fb23eabc5a5ad4a4848d1a4ec7b18c4d0398e27ebc1bd1035e53",
          "0x2dcf1bc6e2d438d6a063a11a1ef8fa83da1f590489abc10128ac4cb342a0b11a",
          "0xda7196757cda7920e203c27e09c7b20f934b0b50d328980739cedc573b2dc65b",
          "0x4b21374d7d772a690b2c9153de379a0251b3ee1bb9761b26e2388ebbe9c7138a",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x3506Bf74E94c49b907f0F2DF896d5d669F7bC146": {
        "index": 15,
        "amount": "0x1cdd7715bd39d5dc2a00",
        "proof": [
          "0xd294fe1c17b50bc57eec8f6d12a92fd8aa99649bd12e06a9310d0faea8cce3c3",
          "0xe06c1b993fc36240a16252518216f5da3999367392cf159818c0f5a3667c8278",
          "0xcfca20d5301531785813514a1db73fba70c094e8c7a9a30c6a7f985929903efd",
          "0x7154da0619a73ba6031db7513e59db2f911cf0768140fd93ff0ff9a1ba9d24e3",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x2dE640a18fE3480aa802aca91f70177aDA103391": {
        "index": 16,
        "amount": "0x2363bb41e5d0f305ae00",
        "proof": [
          "0x693f02ff7e91020fea05aae72b6be288d9245e19b12db781d5edf86c8f469d15",
          "0x6aaf6e7dbf434622b5918626577c944db7f369131053e65a49f511a4065e3eb5",
          "0x02092b1880aa2acfd12bf5797cb11a0656ecbcc8c2b35663e62e80a462a80d7d",
          "0x4b21374d7d772a690b2c9153de379a0251b3ee1bb9761b26e2388ebbe9c7138a",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      },
      "0x1A6224b5ADe2C6d52d75F5d8b82197bbc61007ee": {
        "index": 17,
        "amount": "0x40ee041f70e03d4aca00",
        "proof": [
          "0x9abf0d21d5fdf96bc3d49a24103b31f2fa84c6215cb696df3bdef5c4a8a57670",
          "0x697e1c44002cef892d45733aff715a3fd4a69a3d6f7dd83236f6645f5d81dea1",
          "0x9ac4f6ea0e0b2922968e517b874efb0d622d2bf0b71a90d01ec7a1d67c52408f",
          "0x7154da0619a73ba6031db7513e59db2f911cf0768140fd93ff0ff9a1ba9d24e3",
          "0x48da58cf8e1360028ff917fdb327f26ba4d9f5975c69283a7aec4cac5b2e8e47"
        ]
      }
    }
  }