// ew global variables
let data;
let index = 0;

// nodes
let numberNode;
let nameNode;
let addressNode;
let addressLine2Node;
let addressLine3Node;
const progressBar = document.querySelector("header progress");

// address line 1
// address line 2
// city, state zip
const formatAddress = ({ street, city, state, zip }) => {
  // matches secondary address unit designators (unit 224)
  const secondLineMatch = /(?=unit|apt|ste|rm|dept|fl|bldg)/gi;
  const [line1, line2] = street.split(secondLineMatch, 2);

  return [line1, line2, `${city}, ${state} ${zip}`];
};

// launches confetti and shows a nice message
const showCompletionMessage = () => {
  nameNode.innerHTML = `You did it! ${data.length} entries completed! 🥂🎉`;
  addressNode.innerHTML = "";
  addressLine2Node.innerHTML = "";
  addressLine3Node.innerHTML = "";
  numberNode.innerHTML = "";
  launchConfettiFireworks();
};

const updateProgressBar = (entryIndex) => {
  // calculate the percentage
  const progress = 100 * ((entryIndex + 1) / data.length);
  progressBar.setAttribute("value", progress);
  progressBar.innerHTML = `${progress}%`;
};

// prints an entry to the screen
const printEntry = (entryIndex) => {
  const entry = data[entryIndex];
  const [addressLine1, addressLine2, addressCityLine] = formatAddress({
    street: entry[1],
    city: entry[2],
    state: entry[3],
    zip: entry[4],
  });
  numberNode.innerHTML = entryIndex + 1;
  nameNode.innerHTML = entry[0];
  addressNode.innerHTML = addressLine1;
  addressLine2Node.innerHTML = addressLine2 || "";
  addressLine3Node.innerHTML = addressCityLine;

  updateProgressBar(entryIndex);
};

// puts the template content in main and removes the file reader
const prepareEntryArea = () => {
  const main = document.querySelector("main");

  // remove everything in there
  while (main.firstChild) {
    main.removeChild(main.lastChild);
  }

  const entryAreaTemplate = document.querySelector("template#entry-container");
  const entryArea = entryAreaTemplate.content.cloneNode(true);
  main.appendChild(entryArea);

  // assign the nodes
  numberNode = document.querySelector("#entry-number");
  nameNode = document.querySelector("#name");
  addressNode = document.querySelector("#address-line-1");
  addressLine2Node = document.querySelector("#address-line-2");
  addressLine3Node = document.querySelector("#address-line-3");

  // show the progress bar
  progressBar.removeAttribute("hidden");
};

// handles file upload
document.querySelector('input[type="file"]').addEventListener("change", (event) => {
  const uploadedFile = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(uploadedFile, "UTF-8");
  reader.onload = (e) => {
    data = CSVToArray(e.target.result);
    prepareEntryArea();
    printEntry(0);
  };
  reader.onerror = (e) => {
    console.error(e.target);
    alert("Something went wrong uploading the file. Please refresh and try again.");
  };
});

// toggle theme button
document.querySelector("header button").addEventListener("click", (e) => {
  const htmlNode = document.querySelector("html");
  const currentTheme = htmlNode.getAttribute("data-theme");

  let targetTheme = "dark";
  if (currentTheme === "dark") {
    targetTheme = "light";
  }

  htmlNode.setAttribute("data-theme", targetTheme);
});

// handles keyboard shortcuts
window.addEventListener("keydown", (evt) => {
  if (!data) {
    return;
  }

  // Should not get triggered by a space bar keypress on a button
  const focusedNode = document.activeElement.nodeName;
  const isSpaceKey = evt.code === "Space";
  if (focusedNode === "BUTTON" && isSpaceKey) {
    return;
  }

  switch (evt.code) {
    case "Space":
    case "ArrowRight":
    case "KeyL":
      index += 1;
      break;
    case "ArrowLeft":
    case "Backspace":
    case "KeyH":
      index -= 1;
    default:
      break;
  }

  if (index < 0) {
    index = 0;
  }
  if (index >= data.length) {
    showCompletionMessage();
    // ensures that the user can go back
    index = data.length;
    return;
  }

  printEntry(index);
});
