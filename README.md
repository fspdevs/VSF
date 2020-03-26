## Vision Solar Finance Gatsby/Firebase Site

# TODO:

- Edit signup to account for all reps data and reset Firebase DB
- file upload using Firebase or Multer??? try to stay away from server stuff SERVERLESS so probably firebase/firestore!!
- siteconfig
- Material UI, tables, textfield, form,
- reactHooks
- STyle & Layout
  <!-- - Images/Logo/Colors (probably jack some colors from VS) -->
  - Have to create a new logo in illustrator???
- ~~ make it so users can only see the messages/clients that they created ~~
- Make components that displays a clients profile for the Admin once they choose their name from the userlist
- change messages to clients and users to Reps

# FUTURE Implementations


- configure the gatsby-plugin-material-ui
- esignature
- Switch form regular table to MAterial-Table
- try updating to latest versions of packages every week (--yarn upgrade-interactive --latest--)
- Change all forms into Material Ui forms with validation(optional)
- Make Client info editable/deletable for their respective reps and admins
- Identifty Provider configuration
- Applications and forms should have a "Save and Continue" button
- gatsby plugin manifest for PWA\
- Choose a DOmain Name (visionsolar.app/vsf.dev/sales.visionsolar.com)

# Styling

## Colors

- #FAA818 <em>Solar Orange</em>
- #21303A <em> Grey </em>
- #ffffff <em>White</em>
- #333333 **Dark greyish blue**
- #428ACA **cornflowerblue**

![swatch][colors]

[colors]: https://drive.google.com/uc?export=view&id=1KkrlaA1pDYKzi03Cta7IKAJD0AI9Yvkx

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
    - SnackBar
    - Stepper

## Dividend Finance Notes/Comparison

- Dashboard and Pipeline will be same page in VSF or could be seperate pages
- There should be more options/button to create a client (not just the home dashboard)
- There should be a way to search through the client database for Admins

### Pages and Components

- Client Display Page (is the same as the project display page)
  ![Example][pipeline]
  ![dashboard][dashboard]
- Client Info:
  - Project #/Contract #
  - Phone
  - Email
  - Address
  - Loan Type
- Project Timeline (breadcrumb?)
  - Credit App
    - Details
    - ![details][details]
  - Product Selection
  - Financing Details
    - Addiotional Details (image)
    - Driver's license (upload)
    - Project Details (4.725 KW \$15,400.00)
    - Send Agreements (Signed 2020-01-11)
    - Stipulations (documents requested and their status)
      - ACH Bank Info (uploadable??)x
      - Proof of Ownership (uploadable)
      - Proof of Income (uploadable)
      - Dividend Welcome Call (calling client or provider)
      - ![example][stipulations]
  - Intallation
    - Work Order
      - ![Example][workorder]
    - Substantial Completion
      - ![example][subinfo]
    - Permission to Operate
      - ![Example][finalcompletion]
  - In service (I guess when the project is complete)

### Data and Relationships

<em>Reference the Dividend Finance Pipeline</em>

- <strong>Reps (Team Page)</strong>

  - Id
  - Role
  - Name
  - Manager
  - Email
  - (edit)
  - (delete)

- <strong>Borrower/Client</strong>

  - Id
  - Rep Id
  - Namex
  - Next Step??
  - application progress indicator

- <strong>Project/Contract</strong>

  - Id
  - Borrower/Client Id
  - Rep Id
  - Loan amount
  - Loan type
  - Date Created
  - Date Loan Doc was Sent
  - Deficiency Reasons??
  - Cost/ Wattage
  - Date of Final Approval
  - Date of Work Order Execution

## Images

[details]: https://drive.google.com/open?id=1my4L7rWbFASx2kva4o6GlNiF3yc8JICj
[pipeline]: https://drive.google.com/open?id=1MAfnKblxg79kGXvxPS_hZXU_vmI1PK8k
[projecttimeline]: https://drive.google.com/open?id=1vP9rEtW3aBGOg39W6L0Rn01nzHxToqKI
[dashboard]: https://drive.google.com/open?id=1q*EXZKz_e*-KVdjrKie7007R8UNbpXhe
[subinfo]: https://drive.google.com/open?id=1qmWimkzaylyXVHdWPtpoW6-sqACoPpsh
[finalcompletion]: https://drive.google.com/open?id=1Xxd1y0Amsg04hfHZpmS6zzOerjJbtzSW
[stipulations]: https://drive.google.com/open?id=1Jpv1O4LkGiqE1TItwnrDKFeWWhfUzvkn
[workorder]: https://drive.google.com/open?id=1mgjNfneFRUqqPC_PPYVj162q-r1qQX6j
