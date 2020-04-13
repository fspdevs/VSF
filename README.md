# Vision Solar Finance Gatsby/Firebase Site

## Task List

### Landing Page (pages/index.js) (Kathleen)

- <del>Mobile Responsiveness (For BG Image and the SignIn SignUp Component)</del>
- <del>Download correct BG image (no watermark)</del>

### SignIn Page (component/SignIn/index)

- <del>Enable Google Sign-In in Firebase Console (Avery)</del>
- <del>Remove Social MEdia Sign-IN Options (Avery)</del>
- Change Button Color (Kathleen)
- General Styling (Kathleen)

### SignUP Page

- Add inputs for additional info needed for the Reps. (refer to the list at teh end of the readme)
- Create Validation only for (F. Name, L. Name, Email, Role ), they can add the other stuff in their Profile later via the account.js component

### Navigation Menu Drawer (navigation.js)(Kathleen)

-<del> Add Material Icons</del>

- Change Font
- <del>Remove Landing Page Link</del>
- <del>Change sign out to send you to the landing page</del>
- <del>Add Signout link to end of the navigation list</del>
- Change links font, color, and style

### Client/Homeowner View Component (homeowner.js) (Avery)

- <del>Style Homeowner's General Information as a table on top portion of the compoenent</del>
- <del>Create a back/return button that sends you back to the home page (list of clients)</del>
- file upload using Firebase or Multer??? try to stay away from server stuff SERVERLESS so probably firebase/firestore!!
- Start building out the foundation for this Homeowner contract, creating components for each separate task in project timeline. (refer to screenshots)
- Some files include media uploads to the DB or form fields subimitting information.
- Media and file uploads
- Project status breadcrumb
- Add Logos to the contact info for each client
- When a rep creates a contract or project for a homewoner, the project object should have a field called "projectID" that should be the same as the Homeowners ID from the Firebase Database. This is a way we can keep the contracts in separate list in the database while still linking them ro their respective homeowners.

### Home Page (clientList.js)(Kathleen)

- <del>Remove Address and Phone number from table</del>
- Addtional Styling (Fonts Colors, shadows, padding, spacing)
- Eventually Create Homeowner will be moved to the homeowner.js page but this button will remain here

### Account Page (o) (Avery)

- <del>Remove Link Social Media Links, deactivate password</del>
- Definitely needs Styling
- <del>Change the forms to dropdowns after you click the "forgot password" or "change password" button (popover material ui component)</del>
- Title header
- Think about other things a rep may need to see in their account page
  - Password Management
  -

### Firebase (Avery)

- Add Contract/Project API to Firebase object to create a list in the Firebase database.
- Initiliaze Contract list

### Admin Page

- Keep this page and leave unstyled

## Misc. TODO:

- Mke sure all buttons and forms are using a similar styling layout
  <!-- - file upload using Firebase or Multer??? try to stay away from server stuff SERVERLESS so probably firebase/firestore!! -->
- <del>siteconfig</del>
- Material UI, tables, textfield, form,
- reactHooks
- Style & Layout
  - <del>Images/Logo/Colors (probably jack some colors from VS)</del>
  - <del>Have to create a new logo in illustrator???</del>
- <del>make it so users can only see the messages/clients that they created </del>
- <del>Make components that displays a clients profile for the Admin once they choose their name from the userlist</del>

## FUTURE Implementations

- Match Material UI styling with Theme config options
- configure the gatsby-plugin-material-ui
- esignature
- try updating to latest versions of packages every week (--yarn upgrade-interactive --latest--)
- Change all forms into Material Ui forms with validation(optional)(New Homeowner)
- Make Client info editable/deletable for their respective reps and admins
- Identity Provider configuration
- Applications and forms should have a "Save and Continue" button
- gatsby plugin manifest for PWA
- Choose a DOmain Name (visionsolar.app/vsf.dev/sales.visionsolar.com)
- consider switching over to Firestore so filtering through the database in the Firebase Admin Console would be easier

## Styling

### Colors

- #FAA818 <em>Solar Orange</em>
- #21303A <em> Grey </em>
- #ffffff <em>White</em>
- #333333 **Dark greyish blue**
- #428ACA **cornflowerblue**

![swatch][colors]

[colors]: https://drive.google.com/uc?export=view&id=1KkrlaA1pDYKzi03Cta7IKAJD0AI9Yvkx

### Fonts

- Nunito or Nunito Sans (Headings, Titles)
- Montserrat (TExt, body )
- Spectral (menu, lists)
- Karla (Buttons, links)

### modules

- gatsby-source-filesystem exports three helper functions:
  - createFilePath
  - createRemoteFileNode
  - createFileNodeFromBuffer

### MaterialUI

    - Table
    - button
    - appBar
    - SnackBar
    - Stepper

### Dividend Finance Notes/Comparison

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
  - First Name
  - Last Name
  - Manager
  - Email
  - Phone
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

### Images

[details]: https://drive.google.com/open?id=1my4L7rWbFASx2kva4o6GlNiF3yc8JICj
[pipeline]: https://drive.google.com/open?id=1MAfnKblxg79kGXvxPS_hZXU_vmI1PK8k
[projecttimeline]: https://drive.google.com/open?id=1vP9rEtW3aBGOg39W6L0Rn01nzHxToqKI
[dashboard]: https://drive.google.com/open?id=1q*EXZKz_e*-KVdjrKie7007R8UNbpXhe
[subinfo]: https://drive.google.com/open?id=1qmWimkzaylyXVHdWPtpoW6-sqACoPpsh
[finalcompletion]: https://drive.google.com/open?id=1Xxd1y0Amsg04hfHZpmS6zzOerjJbtzSW
[stipulations]: https://drive.google.com/open?id=1Jpv1O4LkGiqE1TItwnrDKFeWWhfUzvkn
[workorder]: https://drive.google.com/open?id=1mgjNfneFRUqqPC_PPYVj162q-r1qQX6j
