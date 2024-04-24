import fs, { constants } from "node:fs";
import { Buffer } from "node:buffer";
import prompt from "prompt-sync";

import color from "colors";

const userAskings = prompt();

export const fileManage = () => {
  let selector;
  do {
    selector = userAskings(
      color.brightCyan(
        "Which selection do you want to choose? (Lecture: R, Edition: E, Creation: C, Elimination: D, Exit: Q): "
      )
    );
  } while (
    !(
      selector === "R" ||
      selector === "E" ||
      selector === "C" ||
      selector === "D" ||
      selector === "Q"
    )
  );

  if (selector === "Q") {
    return;
  }

  const fileMain = userAskings(
    color.brightCyan("Please, write the file's name: ")
  );
  const filePath = `./folder/${fileMain}`;

  switch (selector) {
    case "R":
      fs.access(filePath, constants.R_OK, (error) => {
        if (error) {
          console.log(color.brightRed("The file can't be read"));
        } else {
          const document = fs.readFileSync(filePath);
          const data = document.toString();
          console.log(color.green(data));
        }
      });
      break;

    case "C":
      const document = userAskings(
        color.brightCyan("Please write the file's content: ")
      );
      const buffer = new Uint8Array(Buffer.from(document));
      fs.writeFile(filePath, buffer, (error) => {
        if (error) {
          console.log(color.brightRed("Sorry we couldn't create the file"));
        }
        console.log(color.green("The file has been created succesfully"));
      });
      break;

    case "E":
      fs.access(filePath, constants.R_OK | constants.W_OK, (error) => {
        if (error) {
          console.log(
            color.brightRed("The fil couldn't read or/and couldn't write.")
          );
        } else {
          const document = fs.readFileSync(filePath);
          const data = document.toString();
          const resultData = userAskings(
            color.brightCyan("Please, write the file's content: ")
          );
          const buffer = new Uint8Array(Buffer.from(resultData));
          fs.writeFile(filePath, buffer, (error) => {
            if (error) {
              console.log(color.brightRed("Sorry we couldn't modify the file"));
            }
            console.log(color.green("The file has been modified succesfully"));
          });
        }
      });
      break;
    case "D":
      fs.rm(filePath, (error) => {
        if (error) {
          console.log(color.brightRed("Sorry we couldn't delete the file"));
        }
        console.log(color.green("The file has been deleted succesfully"));
      });
      break;

    default:
      break;
  }
}; /* Final main function */
