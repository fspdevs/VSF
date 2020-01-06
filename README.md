## Vision Solar Finance Gatsby/Firebase Site

# TODO:

- Edit signup to account for all reps data and reset Firebase DB
- file upload using Firebase or Multer??? try to stay away from server stuff SERVERLESS so probably firebase!!
- siteconfig
- Material UI, tables, textfield, form,
- reactHooks
- STyle & Layout
- Images/Logo/Colors (probably jack some colors from VS)
  - Have to create a new logo in illustrator?
- ~~ make it so users can only see the messages/clients that they created ~~
- Make components that lists each users message for the Admin once they choose their name from the userlist
- change messages to clients and users to Reps

# FUTURE Implementations

- esignature
- Switch form reg8ular table to MAterial-Table
- try updating to latest versions of packages every week (--yarn upgrade-interactive --latest--)
- Change all forms into Material Ui forms with validation(optional)
- Make Client info editable/deletable for their respective reps

# Styling

## Colors

- #FAA818 <em>Solar Orange</em>
- #21303A <em> Grey </em>
- #ffffff <em>White</em>
- #333333 **Dark greyish blue**
- #428ACA **cornflowerblue**
- [Swatch][colors]

[colors]: ./src/images/VSFColors.png

## Fonts

- Nunito or Nunito Sans (Headings, Titles)
- Montserrat (TExt, body )
- Spectral (menu, lists)
- Karla (Buttons, links)

## modules

- gatsby-source-filesystem exports three helper functions:
  - createFilePath
  - createRemoteFileNode
  - createFileNodeFromBuffer

## MaterialUI

    - Table
    - button
    - appBar
