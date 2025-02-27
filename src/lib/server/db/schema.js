import { pgTable, serial, text, varchar, integer, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

// Define enum for user roles
export const rolesEnum = pgEnum('roles', ['guest', 'venue_member', 'security_staff', 'manager', 'supervisor']);

// Users table
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	role: rolesEnum('role').default('guest'),
	approved: boolean('approved').default(false),
	created_at: timestamp('created_at').defaultNow().notNull(),
});

// Schedules table
export const schedules = pgTable('schedules', {
	id: serial('id').primaryKey(),
	weekNumber: integer('week_number').notNull(),
	month: varchar('month', { length: 20 }).notNull(),
	year: integer('year').notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	created_by: integer('created_by').notNull().references(() => users.id),
});

// Events table
export const events = pgTable('events', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	color_code: varchar('color_code', { length: 20 }),
	schedule_id: integer('schedule_id').notNull().references(() => schedules.id),
	day: integer('day').notNull(), // 1-7 for Monday-Sunday
	created_at: timestamp('created_at').defaultNow().notNull(),
});

// Shifts table
export const shifts = pgTable('shifts', {
	id: serial('id').primaryKey(),
	employee_id: integer('employee_id').notNull().references(() => users.id),
	schedule_id: integer('schedule_id').notNull().references(() => schedules.id),
	day: integer('day').notNull(), // 1-7 for Monday-Sunday
	start_time: timestamp('start_time').notNull(),
	end_time: timestamp('end_time').notNull(),
	event_id: integer('event_id').references(() => events.id),
	created_at: timestamp('created_at').defaultNow().notNull(),
});

// Time logs table
export const timeLogs = pgTable('time_logs', {
	id: serial('id').primaryKey(),
	employee_id: integer('employee_id').notNull().references(() => users.id),
	shift_id: integer('shift_id').references(() => shifts.id),
	clock_in: timestamp('clock_in').notNull(),
	clock_out: timestamp('clock_out'),
	break_minutes: integer('break_minutes').default(0),
	break_skipped: boolean('break_skipped').default(false),
	overtime: boolean('overtime').default(false),
	late: boolean('late').default(false),
	edited: boolean('edited').default(false),
	edited_by: integer('edited_by').references(() => users.id),
	created_at: timestamp('created_at').defaultNow().notNull(),
});

// Approved emails list
export const approvedEmails = pgTable('approved_emails', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	created_by: integer('created_by').references(() => users.id),
});