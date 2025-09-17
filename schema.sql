

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE TYPE "public"."status_event" AS ENUM (
    'SCHEDULED',
    'RUNNING',
    'COMPLETED',
    'CANCELLED'
);


ALTER TYPE "public"."status_event" OWNER TO "postgres";


CREATE TYPE "public"."user_role" AS ENUM (
    'ADMIN',
    'MEMBER'
);


ALTER TYPE "public"."user_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_monthly_financial_summary_by_year"("target_year" integer) RETURNS TABLE("month" "text", "incomes" numeric, "expenses" numeric, "balance" numeric)
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN QUERY
  WITH monthly_incomes AS (
    SELECT
      EXTRACT(YEAR FROM date) AS year_num,
      EXTRACT(MONTH FROM date) AS month_num,
      SUM(amount) AS income
    FROM incomes
    WHERE EXTRACT(YEAR FROM date) = target_year
    GROUP BY year_num, month_num
  ),
  monthly_expenses AS (
    SELECT
      EXTRACT(YEAR FROM date) AS year_num,
      EXTRACT(MONTH FROM date) AS month_num,
      SUM(amount) AS expense
    FROM expenses
    WHERE EXTRACT(YEAR FROM date) = target_year
    GROUP BY year_num, month_num
  )
  SELECT
    TO_CHAR(make_date(2000, COALESCE(i.month_num, e.month_num)::int, 1), 'Mon') AS month,
    COALESCE(i.income, 0) AS pemasukan,
    COALESCE(e.expense, 0) AS pengeluaran,
    COALESCE(i.income, 0) - COALESCE(e.expense, 0) AS saldo
  FROM monthly_incomes i
  FULL OUTER JOIN monthly_expenses e ON i.month_num = e.month_num AND i.year_num = e.year_num
  ORDER BY COALESCE(i.month_num, e.month_num);

END;$$;


ALTER FUNCTION "public"."get_monthly_financial_summary_by_year"("target_year" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_total_amount_this_month"() RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    total_income_amount decimal;
BEGIN
    -- Menjumlahkan total amount dari tabel incomes di bulan ini
    SELECT COALESCE(SUM(amount), 0) INTO total_income_amount FROM incomes
    WHERE EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM NOW())
    AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM NOW());

    RETURN total_income_amount;
END;
$$;


ALTER FUNCTION "public"."get_total_amount_this_month"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_total_balance"() RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(amount), 0) FROM incomes
  ) - (
    SELECT COALESCE(SUM(amount), 0) FROM expenses
  );
END;
$$;


ALTER FUNCTION "public"."get_total_balance"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_total_balance_cash"() RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN (
    SELECT COALESCE(SUM(i.amount), 0) FROM incomes i
    JOIN fund_accounts fa ON i.fund_account_id = fa.id
    WHERE fa.type = 'CASH'
  ) - (
    SELECT COALESCE(SUM(e.amount), 0) FROM expenses e
    JOIN fund_accounts fa ON e.fund_account_id = fa.id
    WHERE fa.type = 'CASH'
  );
END;$$;


ALTER FUNCTION "public"."get_total_balance_cash"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_total_balance_non_cash"() RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN (
    -- Menjumlahkan semua income dari akun NON-KAS
    SELECT COALESCE(SUM(i.amount), 0) FROM incomes i
    JOIN fund_accounts fa ON i.fund_account_id = fa.id
    WHERE fa.type != 'CASH'
  ) - (
    -- Menjumlahkan semua expense dari akun NON-KAS
    SELECT COALESCE(SUM(e.amount), 0) FROM expenses e
    JOIN fund_accounts fa ON e.fund_account_id = fa.id
    WHERE fa.type != 'CASH'
  );
END;
$$;


ALTER FUNCTION "public"."get_total_balance_non_cash"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_total_budget"() RETURNS bigint
    LANGUAGE "sql" STABLE
    AS $$
  SELECT SUM(budget) FROM events;
$$;


ALTER FUNCTION "public"."get_total_budget"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_total_expenses_this_month"() RETURNS numeric
    LANGUAGE "sql"
    AS $$
  select coalesce(sum(amount), 0) as total
  from expenses
  where date >= date_trunc('month', now())::date
    and date < (date_trunc('month', now()) + interval '1 month')::date;
$$;


ALTER FUNCTION "public"."get_total_expenses_this_month"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_total_incomes_this_month"() RETURNS numeric
    LANGUAGE "sql"
    AS $$
  select coalesce(sum(amount), 0) as total
  from incomes
  where date >= date_trunc('month', now())::date
    and date < (date_trunc('month', now()) + interval '1 month')::date;
$$;


ALTER FUNCTION "public"."get_total_incomes_this_month"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."accounts" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "userId" "uuid",
    "type" "text" NOT NULL,
    "provider" "text" NOT NULL,
    "providerAccountId" "text" NOT NULL,
    "refresh_token" "text",
    "access_token" "text",
    "expires_at" bigint,
    "id_token" "text",
    "scope" "text",
    "session_state" "text",
    "token_type" "text",
    "createdAt" timestamp with time zone DEFAULT "now"(),
    "updatedAt" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_photos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_id" "uuid",
    "file_path" character varying NOT NULL,
    "caption" "text",
    "uploaded_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."event_photos" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "code" character varying,
    "name" character varying NOT NULL,
    "description" "text",
    "date" "date",
    "status" "public"."status_event" DEFAULT 'SCHEDULED'::"public"."status_event",
    "budget" numeric DEFAULT 0,
    "is_public" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."expenses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_id" "uuid",
    "date" timestamp with time zone,
    "amount" numeric,
    "source" character varying NOT NULL,
    "note" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "fund_account_id" "uuid"
);


ALTER TABLE "public"."expenses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."fund_accounts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(150) NOT NULL,
    "type" character varying(50) NOT NULL,
    "account_number" character varying(100),
    "holder_name" character varying(100) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "provider_name" character varying,
    "is_active" boolean DEFAULT true NOT NULL,
    CONSTRAINT "fund_accounts_type_check" CHECK ((("type")::"text" = ANY ((ARRAY['BANK'::character varying, 'CASH'::character varying, 'EWALLET'::character varying])::"text"[])))
);


ALTER TABLE "public"."fund_accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."incomes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_id" "uuid",
    "date" timestamp with time zone,
    "amount" numeric,
    "source" character varying NOT NULL,
    "note" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "fund_account_id" "uuid"
);


ALTER TABLE "public"."incomes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sessions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "userId" "uuid",
    "sessionToken" "text" NOT NULL,
    "expires" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"(),
    "updatedAt" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying,
    "password" character varying,
    "email" character varying NOT NULL,
    "email_verified" timestamp with time zone,
    "image" "text",
    "role" "public"."user_role" DEFAULT 'MEMBER'::"public"."user_role",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."verification_tokens" (
    "identifier" "text" NOT NULL,
    "token" "text" NOT NULL,
    "expires" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"(),
    "updatedAt" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."verification_tokens" OWNER TO "postgres";


ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId");



ALTER TABLE ONLY "public"."event_photos"
    ADD CONSTRAINT "event_photos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."fund_accounts"
    ADD CONSTRAINT "fund_accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."incomes"
    ADD CONSTRAINT "incomes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_sessionToken_key" UNIQUE ("sessionToken");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."verification_tokens"
    ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("identifier");



ALTER TABLE ONLY "public"."verification_tokens"
    ADD CONSTRAINT "verification_tokens_token_key" UNIQUE ("token");



CREATE OR REPLACE TRIGGER "trigger_fund_accounts_updated_at" BEFORE UPDATE ON "public"."fund_accounts" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_photos"
    ADD CONSTRAINT "event_photos_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_fund_account_id_fkey" FOREIGN KEY ("fund_account_id") REFERENCES "public"."fund_accounts"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."incomes"
    ADD CONSTRAINT "incomes_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."incomes"
    ADD CONSTRAINT "incomes_fund_account_id_fkey" FOREIGN KEY ("fund_account_id") REFERENCES "public"."fund_accounts"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE;



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."get_monthly_financial_summary_by_year"("target_year" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_monthly_financial_summary_by_year"("target_year" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_monthly_financial_summary_by_year"("target_year" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_total_amount_this_month"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_amount_this_month"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_amount_this_month"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_total_balance"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_balance"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_balance"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_total_balance_cash"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_balance_cash"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_balance_cash"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_total_balance_non_cash"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_balance_non_cash"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_balance_non_cash"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_total_budget"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_budget"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_budget"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_total_expenses_this_month"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_expenses_this_month"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_expenses_this_month"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_total_incomes_this_month"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_incomes_this_month"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_incomes_this_month"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON TABLE "public"."accounts" TO "anon";
GRANT ALL ON TABLE "public"."accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."accounts" TO "service_role";



GRANT ALL ON TABLE "public"."event_photos" TO "anon";
GRANT ALL ON TABLE "public"."event_photos" TO "authenticated";
GRANT ALL ON TABLE "public"."event_photos" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON TABLE "public"."expenses" TO "anon";
GRANT ALL ON TABLE "public"."expenses" TO "authenticated";
GRANT ALL ON TABLE "public"."expenses" TO "service_role";



GRANT ALL ON TABLE "public"."fund_accounts" TO "anon";
GRANT ALL ON TABLE "public"."fund_accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."fund_accounts" TO "service_role";



GRANT ALL ON TABLE "public"."incomes" TO "anon";
GRANT ALL ON TABLE "public"."incomes" TO "authenticated";
GRANT ALL ON TABLE "public"."incomes" TO "service_role";



GRANT ALL ON TABLE "public"."sessions" TO "anon";
GRANT ALL ON TABLE "public"."sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."sessions" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON TABLE "public"."verification_tokens" TO "anon";
GRANT ALL ON TABLE "public"."verification_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."verification_tokens" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






RESET ALL;
