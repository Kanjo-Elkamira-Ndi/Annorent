# Annorent - Project Brief

## 1. Product Overview

Annorent is a Cameroon-first real estate and hospitality
marketplace.

It connects people searching for properties, rental
spaces and accommodation with property owners,
property managers, hotel owners and hospitality
businesses.

The platform aims to simplify the process of discovering,
evaluating, booking and managing real estate and
hospitality services.

The long-term vision is to become a trusted marketplace
serving Cameroon and eventually other African markets.

## 2. Problem Statement

Finding suitable properties and accommodation can be
difficult because information is fragmented across
social media, informal networks, agents and disconnected
websites.

Customers may struggle to:

- Find reliable property listings.
- Compare available properties.
- Verify listing information.
- Contact property owners.
- Arrange property visits.
- Understand pricing.
- Discover suitable accommodation.
- Manage reservations.

Property owners and hospitality businesses may struggle
to:

- Reach potential customers.
- Present their listings professionally.
- Manage enquiries.
- Organize bookings.
- Maintain accurate availability.
- Manage their properties digitally.

Annorent aims to provide a unified digital experience
for these needs.

## 3. Product Vision

Build a trusted, intuitive and modern marketplace where
customers can discover properties and accommodation
while owners and hospitality providers can manage their
offerings efficiently.

The platform should make property discovery and
hospitality booking more accessible, transparent and
convenient.

## 4. Target Markets

### Initial Market

Cameroon.

Important example locations include:

- Douala.
- Yaoundé.
- Buea.
- Limbe.
- Bamenda.
- Kribi.
- Bafoussam.
- Garoua.

These are illustrative seed locations, not an exhaustive
list.

### Future Markets

Other African countries may be supported as the
platform expands.

Do not hardcode the application around Cameroon in a way
that prevents future localization.

## 5. Product Categories

### Property Sales

Residential and commercial properties available for
purchase.

### Long-Term Rentals

Properties available for extended rental periods.

Examples:

- Apartments.
- Houses.
- Studios.
- Rooms.
- Commercial premises.

### Flexible Rentals

Spaces that may be rented for shorter or flexible
periods.

Examples:

- Rooms.
- Studios.
- Desks.
- Offices.
- Meeting rooms.

### Hospitality

Accommodation and hospitality providers.

Examples:

- Hotels.
- Guest houses.
- Other supported accommodation types.

The precise category model must remain compatible with
the verified backend contract.

## 6. User Groups

### Customers

People searching for properties, rentals or
accommodation.

### Property Owners

Individuals or organizations listing properties
for sale or rent.

### Hotel Owners and Managers

Hospitality providers managing accommodation listings
and reservations.

### Administrators

Authorized platform operators responsible for
administration, moderation and platform oversight.

The exact backend role names and permissions must be
verified.

## 7. Core Customer Journey

The primary customer journey is:

1. Discover.
2. Evaluate.
3. Connect.
4. Schedule or book.
5. Pay.

The frontend should make each step clear and easy.

## 8. Product Experience Principles

Annorent should be:

- Trustworthy.
- Easy to navigate.
- Visually sophisticated.
- Mobile-friendly.
- Accessible.
- Responsive.
- Fast.
- Secure.
- Consistent.

The product should not feel like a generic listing
template.

## 9. Platform Surfaces

The frontend will contain several major surfaces.

### Public Marketplace

The public-facing discovery experience.

### Authentication

Registration, login and account recovery interfaces,
subject to verified backend capabilities.

### Customer Workspace

Customer profile, saved listings, bookings and related
account functionality.

### Owner Workspace

Property management, listing management, enquiries
and related workflows.

### Hotel Workspace

Hospitality listing management and reservation
workflows.

### Administration

Platform management and moderation interfaces.

## 10. Geographic and Currency Considerations

The initial market uses Central African CFA francs.

Display currency in XAF/FCFA where appropriate.

Use proper locale-aware formatting.

Do not hardcode currency formatting throughout components.

Centralize formatting utilities.

Location selection should support Cameroon initially
while allowing future international expansion.

## 11. Privacy Considerations

Exact GPS coordinates of properties must not be exposed
publicly.

Precise coordinates should only be made available
following an authorized confirmed booking, according
to the backend's security rules.

Public property discovery may use approximate location
information where supported.

## 12. Future Product Possibilities

Potential future capabilities include:

- AI-powered property recommendations.
- Electronic contracts.
- Electronic signatures.
- Video tours.
- Virtual reality tours.
- Maintenance requests.
- Restaurant reservations.
- Additional hospitality services.

These are not automatically part of the initial MVP.

## 13. Success Criteria

The frontend should enable users to:

- Understand Annorent quickly.
- Discover available listings.
- Search and filter effectively.
- Evaluate listings confidently.
- Connect with providers.
- Complete supported booking workflows.
- Manage their accounts.
- Manage listings through appropriate workspaces.

The implementation must be grounded in real backend
capabilities rather than fabricated interactions.