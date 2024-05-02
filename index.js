const {
  Builder,
  By,
  Key,
  until,
  WebElement,
  Select,
} = require("selenium-webdriver");
const fs = require("fs"); // For file system logging

//For logging successes with timestamps of when it happens
function logSuccess(message) {
  const timestamp = new Date().toISOString();
  const logLine = `${timestamp} ==> Success Log: ${message}\n`;
  try {
    fs.appendFileSync("./application.log", logLine);
  } catch (err) {
    console.error("Error writing to application log file:", err);
  }
}
//For logging error with timestamps of when it happens
function logError(message, error) {
  const timestamp = new Date().toISOString();
  const logLine = `${timestamp} ==> Error Log: ${message} - ${error.message}\n`;
  try {
    fs.appendFileSync("./application.log", logLine);
  } catch (err) {
    console.error("Error writing to application log file:", err);
  }
}

async function linkedinTest() {
  //Basic start, opening the Chrome Driver Browser and maximizing it

  const driver = await new Builder().forBrowser("chrome").build();
  logSuccess("Launching Chrome Driver Browser");

  try {
    await driver.manage().window().maximize();
    logSuccess("Maximizing browser window");
  } catch (errnor) {
    logError("Error maximizing browser window:", error);
  }
  // Navigating to LinkedIn
  try {
    await driver.get("https://www.linkedin.com/");
    logSuccess("Navigating to LinkedIn");
  } catch (error) {
    logError("Error navigating to LinkedIn:", error);
  }
  //Clicking the Sign in Button which leads us to the part where we can enter our login data
  try {
    await driver
      .wait(
        until.elementLocated(
          By.xpath(
            "//a[@class='nav__button-secondary btn-md btn-secondary-emphasis' and contains(text(), 'Sign in')]"
          )
        )
      )
      .click();
    logSuccess("Clicking the Sign in Button");

    //Entering the email as the Username

    await driver
      .wait(until.elementLocated(By.xpath("//input[@id='username']")))
      .sendKeys("zack48375@gmail.com");
    logSuccess("Entering username (email)");
  } catch (error) {
    logError("Error entering username (email):", error);
  }
  //for appearing less like a bot
  await driver.sleep(1000);

  //Entering the password
  try {
    await driver
      .wait(until.elementLocated(By.xpath("//input[@id='password']")))
      .sendKeys("Bt3jSgh");
    logSuccess("Entering password");
  } catch (error) {
    logError("Error entering password:", error);
  }
  //for appearing less like a bot
  await driver.sleep(1000);

  //Submitting the login data and end of basic start
  try {
    await driver
      .wait(
        until.elementLocated(
          By.xpath(
            "//button[@class='btn__primary--large from__button--floating' and @data-litms-control-urn='login-submit']"
          )
        )
      )
      .click();
    logSuccess("Submitting login form");
  } catch (error) {
    logError("Error submitting login form:", error);
  }

  // Giving time to load Linkedin and to appear less like a bot
  await driver.sleep(2000);

  // Opening the profile icon that will then dynamically create an element which will have different Id but same classname(crucial to search by classname here)
  try {
    await driver.wait(until.elementLocated(By.id("ember18"))).click();
    logSuccess("Clicking on profile icon");
  } catch (error) {
    logError("Error clicking on profile icon:", error);
  }

  //appear less like a bot and open dropdown
  await driver.sleep(1000);

  // Catching the dynamic element with the classname because that doesn't change unlike the Id, and clicking it
  try {
    await driver
      .wait(
        until.elementLocated(
          By.className("ember-view link-without-hover-state")
        )
      )
      .click();
    logSuccess("Clicking on View Profile link");
  } catch (error) {
    logError("Error clicking on View Profile link:", error);
  }
  //Appear less as a bot
  driver.sleep(1000);

  //scrolling down to + Button
  console.log("PREPARING TO CLICK");
  try {
    await driver.executeScript("window.scrollBy(0, 1000);");
    logSuccess("Scrolled Down Successfuly");
  } catch (error) {
    logError("Failed to Scroll down", error);
  }

  try {
    await driver
      .wait(until.elementLocated(By.id("overflow-Add-new-experience")), 10000)
      .click();
    logSuccess("Clicking the + button");

    console.log("CLICKED THE + BUTTON");
  } catch (error) {
    logError("Error clicking the + button:", error);
  }

  //WE ARE NOW ON OUR PROFILE PAGE

  // Clicking the Add Position section where we get to enter the required position and other inputs from the PDF task file
  try {
    await driver
      .wait(
        until.elementLocated(
          By.className(
            "optional-action-target-wrapper artdeco-dropdown__item artdeco-dropdown__item--is-dropdown overflow-menu-item"
          )
        )
      )
      .click();

    logSuccess("Clicking on Add position button that dropped down");
  } catch (error) {
    logError("Error clicking on Add position button:", error);
  }
  // Entering the position of Software developer per the PDF
  try {
    await driver
      .wait(
        until.elementLocated(
          By.xpath("//input[@placeholder='Ex: Retail Sales Manager']")
        )
      )
      .sendKeys("Software developer");
    logSuccess("Entering Job Position in the input");
    console.log("enter position");
  } catch (error) {
    logError("Error entering Position:", error);
  }
  // Selecting the Company
  try {
    await driver
      .wait(
        until.elementLocated(By.xpath("//input[@placeholder='Ex: Microsoft']"))
      )
      .sendKeys("Neyho Informatika d.o.o.");
    logSuccess("Entering Company in the Input");
  } catch (error) {
    logError("Error entering Company:", error);
  }

  // Selecting the start month from the dropdown and attempting to solve the problem of selecting a month that doesn't have its own element
  try {
    // Click the dropdown
    await driver
      .wait(until.elementLocated(By.xpath("//select[@name='month']")))
      .click();

    // giving it time to drop
    await driver.sleep(500);

    // selecting the month of may from dropdown
    const selectMonth = new Select(
      await driver.findElement(By.xpath("//select[@name='month']"))
    );
    await selectMonth.selectByVisibleText("May");
    logSuccess("Selecting start month");
  } catch (error) {
    logError("Error selecting start month:", error);
  }

  // Selecting the year of 2024 from the dropdown

  try {
    // Click the dropdown
    await driver
      .wait(until.elementLocated(By.xpath("//select[@name='year']")))
      .click();

    // giving it time to drop
    await driver.sleep(500);

    // selecting the year 2024
    const selectYear = new Select(
      await driver.findElement(By.xpath("//select[@name='year']"))
    );
    await selectYear.selectByVisibleText("2024");
    driver.sleep(500);
    await driver.findElement(By.xpath("//select[@name='year']")).click();

    logSuccess("Selecting start year 2024 from dropdown");
  } catch (error) {
    logError("Error selecting start year:", error);
  }
  driver.sleep(3000);
  //Clicking the Save button and finishing this part of the exercise
  console.log("PREPARING TO CLICK AFTER 3S SLEEP");
  try {
    console.log("INTIATING THE FINDING OF SAVE BUTTON");

    // Saving the form
    await driver
      .wait(
        until.elementLocated(
          By.className(
            "artdeco-button artdeco-button--2 artdeco-button--primary ember-view"
          )
        ),
        5000
      )
      .click();
    logSuccess("Clicking on Save button");
  } catch (error) {
    console.log("Error finding the button using XPath:", error);
    throw error;
  }

  //giving it time to save
  driver.sleep(5000);

  try {
    console.log("INTIATING THE FINDING OF SKIP BUTTONS");
    // Target the first button with class and text "Skip"
    await driver
      .wait(
        until.elementLocated(
          By.className(
            "artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view"
          )
        ),
        5000
      )
      .click();
    logSuccess("Clicking Skip button");
  } catch (error) {
    console.error("Error clicking Skip button:", error);
  }

  //give it time
  await driver.sleep(5000);

  // Target the second button with class and text "Skip"
  try {
    await driver
      .wait(
        until.elementLocated(
          By.className(
            "align-self-flex-end artdeco-button artdeco-button--2 artdeco-button--primary ember-view"
          )
        ),
        5000
      )
      .click();
    logSuccess("Clicking 2nd Skip button");
  } catch (error) {
    console.error("Error clicking 2nd Skip button:", error);
  }

  driver.sleep(5000);

  try {
    // Clicking the dismiss button that freshly appeared
    await driver
      .wait(
        until.elementLocated(
          By.className(
            "artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view artdeco-modal__dismiss"
          )
        ),
        5000
      )
      .click();
    logSuccess("Clicking on Dismiss Button");
  } catch (error) {
    console.log("Error finding the button using XPath:", error);
  }
  try {
    // Clicking the discard button
    await driver
      .wait(
        until.elementLocated(
          By.className(
            "artdeco-button artdeco-button--2 artdeco-button--primary ember-view artdeco-modal__confirm-dialog-btn"
          )
        ),
        5000
      )
      .click();
    logSuccess("Clicking on Discard Button");
  } catch (error) {
    console.log("Error finding the button using XPath:", error);
  }
  try {
    // Clicking the final skip button
    await driver
      .wait(
        until.elementLocated(
          By.className(
            "align-self-flex-end artdeco-button artdeco-button--2 artdeco-button--primary ember-view"
          )
        ),
        5000
      )
      .click();
    logSuccess("Clicking on Discard Button");
  } catch (error) {
    console.log("Error finding the button using XPath:", error);
  }

  //
  // Finished with our data entry and now onto Job searching part of PDF
  //

  //Next part is to search for jobs

  //Jobs Section ==> Clicking its icon
  try {
    // Clicking the link with "Jobs" text
    await driver.wait(until.elementLocated(By.linkText("Jobs"))).click();

    logSuccess("Clicking on Jobs Link");
  } catch (error) {
    console.log("Error finding the Jobs link:", error);
  }
  try {
    // Click on the first input to spawn the two ghost inputs
    await driver.sleep(3000);
    console.log("FINDING FIRST INPUT");
    await driver
      .wait(
        until.elementLocated(
          By.xpath(
            "//input[@class='jobs-search-box__text-input jobs-search-box__keyboard-text-input' and @aria-expanded='false']"
          )
        )
      )
      .click();
    console.log("First input found");
    logSuccess("Clicking on first input");
  } catch (error) {
    console.log("Error finding the first input:", error);
  }

  // Send keys to the expanded input "software developer intern"
  try {
    await driver.sleep(2000);
    console.log("Finding expanded input");
    await driver
      .wait(
        until.elementLocated(
          By.xpath(
            "//input[@class='jobs-search-box__text-input jobs-search-box__keyboard-text-input' and @data-artdeco-is-focused='true']"
          )
        )
      )
      .sendKeys("Software Developer Intern", Key.ENTER);
    console.log("Expanded input found and inputted");
    logSuccess("Sending Software Developer Intern to ghost expanded input");
  } catch (error) {
    console.log("Error finding the expanded input:", error);
  }

  //giving it time to load the search results, this can take time
  await driver.sleep(4000);

  //Extracting data from search results and saving them in a JSON file
  try {
    const searchResultElements = await driver.findElements(
      By.xpath("//li[contains(@class, 'jobs-search-results__list-item')]")
    );

    const searchResults = [];
    for (const element of searchResultElements) {
      // Title Extraction
      const titleElement = await element.findElement(
        By.xpath("//a[contains(@class, 'job-card-list__title')]")
      );
      const title = await titleElement.getText();

      const companyElement = await element.findElement(
        By.xpath(
          "//span[contains(@class, 'job-card-container__primary-description')]"
        )
      );
      const company = await companyElement.getText();

      const locationElement = await element.findElement(
        By.xpath("//li[contains(@class, 'job-card-container__metadata-item')]")
      );
      const location = await locationElement.getText();
      searchResults.push({ title, company, location });
      logSuccess("Extracted search result:", { title, company, location });
    }
    // Save search results to JSON
    const fileName = "search_results.json";
    fs.writeFileSync(fileName, JSON.stringify(searchResults, null, 2));
    logSuccess("Search results saved to JSON file:", fileName);
  } catch (error) {
    logError("Error extracting search results:", error);
  }

  //Above jobs there is an ALERT toggle which we toggle ON
  try {
    logSuccess("Clicking on alert button");
    await driver
      .wait(until.elementLocated(By.className("artdeco-toggle__text")))
      .click();
    logSuccess("Alert Clicked");
  } catch (error) {
    logError("Error clicking on alert button:", error.message);
    throw error;
  }
  //Doing the Final Step, Messagin the message from PDF

  //giving it some time so everything settles down
  driver.sleep(3000);
  //Going to messaging part of the site
  try {
    await driver.wait(until.elementLocated(By.linkText("Messaging"))).click();
    logSuccess("Clicking on messaging icon");
  } catch (error) {
    logError("Error clicking on messaging icon:", error.message);
    throw error;
  }

  // Typing the message
  logSuccess("Typing message");
  try {
    await driver
      .wait(
        until.elementLocated(
          By.className(
            "msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate msg-form__contenteditable--redesign"
          )
        )
      )
      .sendKeys("Hi, My name is Robot Robotic and this is a test message.");
  } catch (error) {
    logError("Error typing message:", error.message);
    throw error;
  }

  //Entering the name of the contact, but without selecting it, as that would block the MESSAGING part with prompt to buy PREMIUM MEMBERSHIP
  try {
    await driver
      .wait(
        until.elementLocated(
          By.xpath("//input[@placeholder='Type a name or multiple names']")
        )
      )
      .sendKeys("Tack Zack");
    logSuccess("Typing contact name in search");
  } catch (error) {
    logError("Error typing contact name in search:", error.message);
    throw error;
  }

  //Pressing the Send button, hypothetical part, because the button is DISABLED unless you are a PREMIUM MEMBER

  try {
    await driver.wait(
      until.elementLocated(
        By.xpath("//button[@type='submit'][contains(text(), 'Send')]")
      )
    );
    logSuccess("Send button located");
    //We are not clicking it cos it is DISABLED unless you BUY PREMIUM MEMBERSHIP
  } catch (error) {
    logError("Error sending message:", error.message);
    throw error;
  } finally {
    // Quit the browser driver
    await driver.quit();
  }
}

//calling the function
linkedinTest();
