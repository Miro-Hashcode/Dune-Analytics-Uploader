-- Dune Analytics SQL Queries for WayFi Data
-- These queries can be used to visualize the data uploaded to Dune Analytics

-- =============================================
-- Total GB Offloaded
-- =============================================

-- Simple query to get the total GB offloaded
SELECT *
FROM dune.wayfiwireless.dataset_wayfi_total_gb_offloaded
LIMIT 1

-- =============================================
-- Total Users Served
-- =============================================

-- Simple query to get the total users served
SELECT * 
FROM dune.wayfiwireless.dataset_wayfi_total_users_served
LIMIT 1;

-- =============================================
-- Total Unique Sessions
-- =============================================

-- Simple query to get the total unique sessions
SELECT *
FROM dune.wayfiwireless.dataset_wayfi_total_unique_sessions
LIMIT 1;

-- =============================================
-- Identity Providers Offloading
-- =============================================

-- Query to get the breakdown of identity providers
SELECT *
FROM dune.wayfiwireless.dataset_wayfi_identity_providers_offloading

-- =============================================
-- Active Locations in the Last 30 Days
-- =============================================

-- Query to get the count of active locations
SELECT * 
FROM dune.wayfiwireless.dataset_wayfi_active_locations_30days
LIMIT 1;

-- =============================================
-- Radius Serving
-- =============================================

-- Query to get the radius serving data
SELECT *
FROM dune.wayfiwireless.dataset_wayfi_radius_serving