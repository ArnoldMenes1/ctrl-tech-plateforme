-- Reinforce inventory invariants at the database boundary.
--> statement-breakpoint
ALTER TABLE inventory_items
  ADD CONSTRAINT inventory_low_stock_threshold_nonnegative
  CHECK (low_stock_threshold >= 0);
