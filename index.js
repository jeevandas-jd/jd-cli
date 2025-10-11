#!/usr/bin/env node

const chalk = require("chalk");
const ora = require("ora");
const gradient = require("gradient-string");

// Pixel logo frames for JD (upper to lower blink)
const frames = [
  gradient.vice(`
       █████ ██████████  
      ░░███ ░░███░░░░███ 
       ░███  ░███   ░░███
       ░███  ░███    ░███
       ░███  ░███    ░███
 ███   ░███  ░███    ███ 
░░████████   ██████████  
 ░░░░░░░░   ░░░░░░░░░░   
                            
                            
  `),
  gradient.pastel(`
       █████ ██████████  
      ░░███ ░░███░░░░███ 
       ░███  ░███   ░░███
       ░███  ░███    ░███
       ░███  ░███    ░███
 ███   ░███  ░███    ███ 
░░████████   ██████████  
 ░░░░░░░░   ░░░░░░░░░░  
                            
                            
  `),
  gradient.vice(`
       █████ ██████████  
      ░░███ ░░███░░░░███ 
       ░███  ░███   ░░███
       ░███  ░███    ░███
       ░███  ░███    ░███
 ███   ░███  ░███    ███ 
░░████████   ██████████  
 ░░░░░░░░   ░░░░░░░░░░  
                            
                            
  `),
  gradient.pastel(`
       █████ ██████████  
      ░░███ ░░███░░░░███ 
       ░███  ░███   ░░███
       ░███  ░███    ░███
       ░███  ░███    ░███
 ███   ░███  ░███    ███ 
░░████████   ██████████  
 ░░░░░░░░   ░░░░░░░░░░  
                            
                            
  `),
];

const logo=[
]
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "--version":
    console.log(chalk.cyan.bold("jd CLI version 1.0.0 🚀"));
    break;

  case "--update":
    console.clear();
    const spinner = ora("Updating jd CLI...").start();

    // Step 1: show the spinner for 1.5 seconds
    setTimeout(() => {
      spinner.stop();
      console.clear();
      console.log(chalk.yellow("⚙️  Installing updates...\n"));

      // Step 2: start pixel-art blinking JD animation
      let i = 0;
      const interval = setInterval(() => {
        console.clear();
        console.log(frames[i % frames.length]);
        i++;
        if (i === frames.length * 3) { // blink a few times
          clearInterval(interval);
          console.clear();
          console.log(gradient.pastel.multiline(`
          ✅ Update Complete!
          --------------------------
          jd CLI is now up-to-date 🎉
          Version: 1.0.1
          `));
        }
      }, 300);
    }, 1500);
    break;

  case "greet":
    console.log(
      gradient.pastel.multiline(`
      👋 Hey there! This is JD’s custom CLI tool.
      Built with ❤️ and JavaScript.
    `)
    );
    break;

  case "celebrate":
    console.clear();
    console.log("\n");
    console.log(gradient.cristal.multiline(`
        🎉🎂 HAPPY BIRTHDAY JD! 🎂🎉
    `));
    let count = 0;
    const colors = [gradient.pastel, gradient.summer, gradient.cristal, gradient.mind];
    const interval = setInterval(() => {
      console.clear();
      console.log(colors[count % colors.length].multiline(`
        🎉🎂 HAPPY BIRTHDAY JD! 🎂🎉
      `));
      count++;
      if (count === 10) {
        clearInterval(interval);
        console.log(
          gradient.pastel.multiline(`
          🥳 Wishing you an amazing year ahead!
          Keep building cool stuff and breaking limits 💥
          — from your CLI friend 🖥️
          `)
        );
      }
    }, 300);
    break;

  default:
    console.log(chalk.yellow("Usage:"));
    console.log("  jd --version   Show version");
    console.log("  jd --update    Update CLI");
    console.log("  jd greet       Say hello");
    console.log("  jd celebrate   Birthday greeting 🎂");
    break;
}

