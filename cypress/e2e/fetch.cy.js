describe("Find the Fake Gold Bar", () => {
  beforeEach(() => {
    // Visit the website
    cy.visit("http://sdetchallenge.fetch.com/");
  });

  it("Should find the fake gold bar", () => {
    // Define the heaps
    const firstHeap = [0, 1, 2];
    const secondHeap = [3, 4, 5];
    const thirdHeap = [6, 7, 8];

    // Function to perform a single weighing
    const performWeighing = (leftBars, rightBars) => {
      cy.get('input[data-side="left"]').each(($input, index) => {
        if (index < leftBars.length) {
          cy.wrap($input).clear().type(leftBars[index]);
        }
      });

      cy.get('input[data-side="right"]').each(($input, index) => {
        if (index < rightBars.length) {
          cy.wrap($input).clear().type(rightBars[index]);
        }
      });

      cy.get("#weigh").click();
    };

    // Function to compare numbers in the third heap and put them in the left and right inputs
    const compareLastHeapNumbers = (heap) => {
      cy.get('input[data-side="left"]').each(($inpt) => {
        cy.wrap($inpt).clear();
      });

      cy.get('input[data-side="right"]').each(($inpt) => {
        cy.wrap($inpt).clear();
      });

      cy.get('input[data-side="left"]').eq(0).type(heap[0]);
      cy.get('input[data-side="right"]').eq(0).type(heap[1]);
      cy.get("#weigh").click();

      cy.wait(5000);

      cy.get('.game-info')
        .find('ol li:last') // Select the last li element
        .then(($li) => {
          const response = $li.text();
          console.log('Second Weighting:' , response);

          const btnIndex = response.includes('<') ? 0 : response.includes('>') ? 1 : 2;
          const btnValue = heap[btnIndex];

          cy.log(`Clicking button: ${btnValue}`);
          cy.get('.coins').find(`button:contains("${btnValue}")`).click();
        });
    };

    // Perform the initial weighing to narrow down the groups
    performWeighing(firstHeap, secondHeap);

    // Check the weighing result for the first weighing
    cy.get('.game-info')
      .find('ol li:last') // Select the last li element
      .then(($li) => {
        const response = $li.text();
        console.log('First Weighting:' , response);

        if (response.includes('<')) {
          compareLastHeapNumbers(firstHeap);
        } else if (response.includes('>')) {
          compareLastHeapNumbers(secondHeap);
        } else {
          compareLastHeapNumbers(thirdHeap);
        }
      });

    // Check the result message
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Yay! You find it!"); // Check if the alert message is correct
    });
  });
});
