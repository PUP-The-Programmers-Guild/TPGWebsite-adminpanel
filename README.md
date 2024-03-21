# TPGWebsite-adminpanel
Built with NextJS 13. Uses `/pages` routing. 
<hr/>

## Sitemap:
### Unprotected Route:
1. `/` as Login Page
    - Email, Password Login Form

### Protected Routes:
1. **Member Dashboard**
    - Route: `/dashboard/members`
    - CRUD
        - C = Create a new member
        - R = Read all members and member info
        - U = Update member info
        - D = Soft-delete Member info
2. **Member Application Dashboard**
    - Route: `/dashboard/members/applications`
    - RU
        - C is from TPGWebsite's `/register` / "Be a Devskolar" Route
        - R = View all pending, accepted, denied Membership Application
        - U = Accept / Deny Membership Application
        - D = Soft-delete Membership Applications
3. **Events Dashboard**
    - Route: `/dashboard/events`
    - CRUD
        - C = Create Event
        - R = Read and Filter/sort Events
        - U = Update Event Info
        - D = Soft-delete Info
4. **FAQs Dashboard**
    - Route: `/dashboard/faqs`
    - CRUD
        - C = Create FAQ and Answer
        - R = Read all FAQs, sort by creation date
        - U = Update FAQ and Answer
        - D = Soft-delete FAQ and Answer