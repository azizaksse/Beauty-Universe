-- Create orders table for COD delivery
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  wilaya TEXT NOT NULL,
  delivery_type TEXT NOT NULL CHECK (delivery_type IN ('home', 'stop_desk')),
  address TEXT,
  notes TEXT,
  items JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can create orders (for COD)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update orders
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete orders
CREATE POLICY "Admins can delete orders"
ON public.orders
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();