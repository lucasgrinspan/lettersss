## A very specific use case...

Has this happened to you?
* You have to address hundreds of enevelopes by hand
* That data is available in a CSV
* That CSV happens to be in an exact format
* You need dark mode

If so, then you landed on the right spot!

In seriousness, this is a small utility created for [Alachua Conservation Trust](https://alachuaconservationtrust.org) (donate!) that parses a CSV file of names and addresses, presenting the entries one at a time in envelope format in a **really big** font size. From there, it's really easy to read the name and address and write it down. Just press the space bar to go to the next entry. This utility is most useful if you're working through hundreds of addresses and if reading Excel rows one by one melts your eyeballs.

## Usage

You can just visit the GitHub pages of this repo to access the utility: https://lucasgrinspan.github.io/lettersss/index.html. Or you can clone the repo and open `index.html` in your browser. On the landing page, you'll be asked to upload a CSV. The file that gets uploaded doesn't go to any servers. I don't even have a server.

Once the CSV gets uploaded, the site will parse the file, presenting and formatting each CSV line one at a time. Press the space bar or the right arrow key to move to the next entry. Press the left arrow key to move back an entry.

## CSV

The site expects the CSV file to be in this format.
```csv
first and last name, street address, city, state, zip code
```
Apartment unit designators don't need to be in their own column. The street address gets parsed for those designators and is automatically presented in a new line.

## Images

![Upload screen](https://user-images.githubusercontent.com/32201603/146122328-9c5ec48c-9bfd-478e-9abb-bbc3b569ed8d.png)
![entry screen in light mode](https://user-images.githubusercontent.com/32201603/146122620-24ef4ea7-54bf-4737-843b-ae2fd85d114c.png)
![entry screen in dark mode](https://user-images.githubusercontent.com/32201603/146122631-4b016f78-ae34-455f-9668-04426348af3d.png)
![a picture of the utility in action](https://user-images.githubusercontent.com/32201603/146124932-008baebb-250b-4fa0-b8e6-74a164ab79ab.jpg)

This project exclusively uses CSS keyword colors!


