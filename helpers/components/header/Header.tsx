"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import ContactBar from "./socialMedia";
import { FaChevronDown, FaChevronLeft,  FaSearch,FaHeart, FaTimes, FaUser, FaRegCalendarAlt, FaCheckCircle, FaBell } from "react-icons/fa";
import { NextRouter, useRouter } from "next/router";
import wishlistsidebar from "./wishlistsidebar";
import WishlistSidebar from "./wishlistsidebar";
import { FaRightFromBracket } from "react-icons/fa6";

const Logo = () => (
  <div>
    <img
      src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
      alt="logo"
      onClick={() => {
        window.scrollTo(10, 0);
      }}
      className="w-[200px] md:hidden"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className="hidden md:flex md:w-[150px] xl:w-[187px] mr-2"
      aria-label="Masters Clinics Logo"
    >
      <rect width="80" height="80" fill="transparent" />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A58532" />
          <stop offset="50%" stopColor="#CBA853" />
          <stop offset="100%" stopColor="#f0db83" />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="gold-gradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#A58532"/>
          <stop offset="50%" stopColor="#CBA853"/>
          <stop offset="100%" stopColor="#f0db83"/>
        </linearGradient>
      </defs>
      <path fill="url(#gold-gradient)" d="M25.32,54.09c-4.53,0-9.05.05-13.58-.02-.64-.09-.47-.83-.27-1.23,1.79-.07,3.93-.14,5.11-1.71.95-1.05.8-2.54.85-3.85v-6.43h2.44v7.67c-.07,1.35.57,2.69,1.72,3.42,1.19.82,2.69.76,4.07.91.64.26.39,1.37-.33,1.24Z"/>
      <path fill="url(#goldGradient)" d="M36.03,34.41h-9.96c-2.07-4.77-4.13-9.54-6.2-14.32,0,4.77,0,9.54,0,14.32h-2.44c0-4.21,0-8.42,0-12.63-.08-1.11.04-2.31-.44-3.34-1.1-1.56-3.2-1.49-4.9-1.5-.5.12-1-.39-.78-.88.1-.53.7-.36,1.08-.41,5.21.01,10.42,0,15.63,0,2.67,6.25,5.34,12.50,8.01,18.75Z"/>
      <path fill="url(#gold-gradient)" d="M28.87,40.85h12.36c-1.79,4.21-3.6,8.40-5.43,12.60-.15.52-.70.95-1.18.50-.40-.59-.62-1.27-.91-1.92-1.61-3.72-3.23-7.45-4.84-11.17Z"/>
      <path fill="url(#goldGradient)" d="M70.17,28.58c-2.25,1.72-5.97,1.28-7.56-1.13-1.03-1.61-1.16-3.55-1.40-5.39-.18-1.38-.98-2.86-2.45-3.18-2.10-.41-4.11.61-5.87,1.64-2.92,1.76-5.07,4.58-6.43,7.68-.83,2.08-1.69,4.15-2.54,6.21h-2.65c.67-1.69,1.35-3.38,2.03-5.06,1.22-2.92,2.55-5.85,4.57-8.32,2.84-3.49,7.37-5.41,11.84-5.38,3-.02,6.14.63,8.53,2.54,1.62,1.32,3.07,3.05,3.45,5.16.40,1.84.01,4.01-1.52,5.23Z"/>
      <path fill="url(#goldGradient)" d="M53.81,34.41h-5.72c.38-.81.78-1.61,1.20-2.40,1.03-2.02,1.96-4.11,3.37-5.91.25-.35.58-.62.95-.82-.29,3.03-.26,6.11.20,9.13Z"/>
      <path fill="url(#gold-gradient)" d="M72.87,44.73c-1.64,3.22-4.16,6.07-7.42,7.69-3.52,1.83-7.76,2.07-11.54.98-4.46-1.35-7.76-5.15-9.46-9.37-.25-.55.06-1.12.25-1.63.22-.51.44-1.03.65-1.55h10.21c.86,2.01,2.03,3.91,3.74,5.29,2.47,1.98,6.21,2.16,8.84.40,1.36-.81,2.35-2.06,3.54-3.08.78-.32,1.59.53,1.18,1.27Z"/>
      <path fill="white" d="M10.14,34.76l.40-.35c.31-.27.61-.53.89-.76.17-.15.65-.52.81-.60.02-.01.35-.14.47-.13.15.02.44.07.50.27.03.10.07.49.02.55l-.27.35c-.20.35-.44.73-.66,1.12-.18.32-.36.66-.49.99-.14.31-.29.67-.44,1.05-.18.45-.37.92-.54,1.35-.18.46-.33.88-.42,1.20-.02.05-.18.55-.23.88-.06.29-.19.65-.17.79,0,.03.01.26.02.42,0,.19.02.33.01.36-.01.12-.07.15-.11.10-.04-.05-.12-.23-.14-.46-.02-.22-.02-.49-.01-.66.02-.24.19-1.51.30-2.03.07-.27.21-.81.39-1.41l.24-.78c.12-.37.24-.74.36-1.07.06-.16.12-.31.18-.45.19-.44.34-.76.35-1.01,0-.04-.02-.07-.05-.08-.10-.01-.28.02-.55.25-.26.20-.56.34-.80.52-.43.31-.81.65-1.15.92-.31.27-.72.66-1.13,1.01-.27.24-.61.60-.81.81-.19.21-.28.39-.41.48-.18.13-.43.18-.55.18-.15,0-.41-.22-.41-.31,0-.11-.05-.26,0-.49.03-.15.15-.61.20-.71.27-.76.34-.85.49-1.33.09-.26.09-.22.14-.47.05-.19.21-.44.13-.55-.14-.21-.68.16-.92.38-.14.13-.30.28-.47.46-.14.14-.28.29-.43.45-.25.26-.50.55-.77.84-.41.46-.83.94-1.23,1.39-.54.61-1.04,1.15-1.40,1.50-.17.16-.29.38-.46.52-.21.18-.56.22-.64.22-.13,0-.32-.23-.31-.34,0-.02-.08-.02-.07-.15,0-.09.12-.44.13-.52.08-.19.42-.32.46-.32.14-.02.54-.16.92-.47.50-.40.98-.76,1.48-1.23.36-.34.71-.69,1.06-1.03l1.23-1.24c.36-.36.70-.71,1.03-1.01.20-.18.53-.40.67-.50.08-.05.25-.10.41-.11.15,0,.29.03.32.04.08.03.30.19.21.43-.02.09-.14.42-.24.59-.23.49-.51,1.04-.60,1.35-.17.54-.15.59-.21,1,0,.02-.07.35.04.35.08,0,.18-.04.22-.07.06-.03.35-.20.78-.53.49-.38.91-.81,1.24-1.09.36-.30.68-.58.99-.85Z"/>
      <path fill="white" d="M16.67,36.06c0,.06-.02.11-.04.21-.01.08-.09.21-.13.22-.04.02-.18.12-.22.12-.12,0-.24-.05-.38-.02-.09.02-.20,0-.32.05-.24.11-.43.23-.58.35-.32.23-.49.41-.66.58-.13.12-.30.25-.44.44-.03.03-.24.31-.22.37.01.04.18-.09.29-.15.60-.33,2.01-1.20,2.45-1.43.09-.10.25-.14.31-.14.05,0,.25.05.32.10s.08.13.08.20c0,.15-.02.26-.16.34-.19.10-.21.33-.25.38-.08.16-.15.38-.15.50,0,.15.03.25.08.31.09.10.23.11.38.05.25-.08.53-.24.69-.35.50-.32.88-.52,1.02-.69.03-.04.26-.11.32-.07.02.01.05.15,0,.18-.12.08-.18.09-.35.21-.15.11-.56.35-.75.48-.38.26-.76.57-1.05.78-.27.20-.33.27-.61.29-.29.02-.58-.35-.52-.73.02-.15.03-.43.09-.67.04-.18.03-.17.07-.30.01-.06.01-.11-.05-.12-.06,0-.14,0-.26.04-.13.04-.31.12-.35.14l-.53.33c-.29.19-.49.32-.70.54-.09.10-.31.26-.44.40-.20.20-.34.39-.45.43-.17.07-.44.03-.55-.06-.10-.09-.21-.36-.20-.45.03-.14.10-.33.22-.52.12-.17.24-.37.42-.57.28-.31.51-.51.86-.82.19-.16.50-.42.71-.56.24-.14.53-.31.84-.44.26-.12.54-.23.69-.24.26-.01.49.15.50.28Z"/>
      <path fill="white" d="M21.10,39.12c-.14.07-.29.12-.42.18-.15.07-.38.10-.59.13-.17.02-.37.02-.50.04-.15.03-.44,0-.72-.05-.14-.03-.32-.08-.50-.14-.16-.05-.32-.12-.44-.19-.10-.05-.18-.12-.22-.18-.20-.30-.04-.47.02-.28.02.07.12.14.26.20.10.04.23.09.36.12.26.07.53.12.69.10.22-.02.41.02.77-.02.13-.02.29-.07.46-.09.09-.01.30-.07.39-.29.07-.15-.06-.36-.22-.48-.09-.08-.18-.20-.30-.28-.09-.07-.19-.13-.28-.19-.15-.10-.28-.20-.30-.27-.05-.22,0-.32.03-.37.07-.13.19-.25.33-.37.13-.10.29-.20.44-.30.16-.10.33-.19.47-.26.12-.07.25-.13.38-.18.21-.08.42-.13.56-.16.14-.03.27-.04.41-.02.03.02.17.03.26.08.09.06.13.16.14.19.01.06-.04.18-.07.25-.09.18-.19.31-.37.42-.05.03-.20.09-.33.11-.13.02-.24-.02-.26-.16,0-.02,0-.11,0-.14-.01-.05-.04-.06-.07-.07-.03-.01-.04-.04-.12-.03-.05.02-.24-.01-.33.03-.10.04-.18.02-.22.05-.14.08-.24.12-.31.15-.10.05-.16.09-.24.23-.09.14.13.24.19.30.05.07.17.14.27.20.14.08.29.24.44.33.10.05.31.18.42.32.12.14.17.29.14.50-.02.09-.04.13-.18.30-.02.03-.22.14-.43.26Z"/>
      <path fill="white" d="M23.24,38.51c.05-.19.24-.53.37-.75.25-.41.49-.85.69-1.15.31-.47.70-.93,1.03-1.39-.22.05-.39.10-.50.14-.15.05-.70.19-.82.22-.10.03-.48,0-.55-.03-.10-.05-.09-.29-.02-.37.04-.03.25-.36.48-.39.19-.03.39.03.70.02.34-.02.72-.03,1.07-.05.14-.15.27-.29.39-.42.11-.14.19-.27.20-.32.01-.05.07-.21.24-.30.09-.05.45-.13.60-.04.05.03.10.26.10.33,0,.10-.04.19-.12.27-.12.13-.31.23-.44.31-.03.02-.07.05-.12.09.44-.03.97-.05,1.45-.06.51,0,1.03.05,1.15.05.20.01.26.08.19.12-.18.08-.12.02-.37.05-.06,0-.53-.01-.83,0-.27,0-.58.05-.82.07-.30.02-.52.09-.63.12-.16.04-.35.06-.52.08-.18.20-.39.42-.57.67-.34.48-.51.80-.76,1.19-.14.20-.32.62-.43.84-.11.22-.21.48-.21.61,0,.08.02.13.07.15.07.03.16.02.23,0,.19-.04.53-.16.86-.32.31-.15.74-.29,1.02-.43.16-.08.60-.20.71-.26.04-.02.13.03.14.06,0,.02,0,.12-.04.14-.09.04-.18.02-.29.05-.25.08-.64.29-.96.46-.55.30-.69.39-1.09.63-.07.04-.48.25-.63.35-.14.09-.30.12-.34.14-.10.03-.33-.01-.47-.09-.12-.07-.22-.16-.24-.32-.03-.24.02-.27.06-.47Z"/>
      <path fill="white" d="M32.27,37.61s-.06.11-.14.14c-.10.04-.20-.03-.37.02-.16.05-.35.12-.54.21-.21.10-.49.20-.70.31-.22.11-.43.22-.65.34-.22.12-.45.24-.70.36-.38.17-.61.30-.92.42-.15.05-.29.07-.53.10-.19.02-.46-.10-.59-.25-.08-.10-.18-.33-.15-.51.03-.14.10-.38.20-.55.14-.23.29-.42.51-.66.19-.21.42-.42.67-.62.16-.14.35-.27.54-.40.16-.11.33-.21.49-.30.22-.13.46-.20.67-.26.19-.05.37-.08.52-.09.22-.02.38.02.46.08.09.07.29.24.27.33-.02.09-.02.29-.09.37-.07.08-.20.16-.30.20-.12.05-.22.09-.31.11-.20.05-.42.12-.68.21-.14.05-.28.11-.44.18-.19.08-.40.19-.60.30l-.61.32s-.07.10-.10.16c-.10.20-.20.32-.22.46-.02.18.08.27.21.27.20.01.48-.04.84-.18.19-.08.42-.17.65-.27.32-.14.67-.29,1.00-.43.27-.11.53-.21.75-.29.44-.15.56-.19.72-.19.07,0,.14.07,.14.12ZM30.33,36.48v-.04c-.08-.03-.19-.03-.29.01-.17.07-.36.24-.53.33-.23.14-.32.25-.53.42-.13.11-.22.20-.32.31.14-.07.39-.19.70-.35l.49-.26c.19-.10.30-.18.35-.21.05-.04.13-.13.13-.21Z"/>
      <path fill="white" d="M33.50,36.08c.09-.03.25-.05.37-.04.05,0,.14.03.21.07.06.03.10.09.13.12.04.04.07.18.04.24-.03.09-.07.12-.13.19-.04.04-.09.07-.18.19l-.13.20s-.03.08,0,.08c.04,0,.12-.05.13-.06.09-.08.18-.17.25-.22.25-.19.72-.56,1.09-.77.09-.05.21-.13.30-.17.11-.05.20-.08.32-.11.11-.03.16,0,.28-.02.05,0,.20.04.24.10.04.05.09.17.08.22-.05.21-.16.37-.35.50-.09.06-.05.08-.14.08-.14.01-.20.02-.31-.02-.15-.05-.22-.10-.33-.10-.09,0-.30.05-.42.10-.12.04-.39.25-.57.38-.22.15-.56.47-.76.66-.36.33-.28.26-.55.60-.14.17-.16.31-.19.37-.04.10-.03.23-.05.30-.02.11-.08.20-.15.29-.09.12-.33.20-.49.19-.13-.01-.31-.29-.33-.41,0-.16.10-.42.18-.58.14-.29.22-.42.54-.88.12-.16.44-.61.53-.76.07-.09.08-.41.14-.50.04-.09.10-.20.24-.25Z"/>
      <path fill="white" d="M38.63,39.12c-.14.07-.29.12-.42.18-.15.07-.38.10-.59.13-.17.02-.37.02-.50.04-.15.03-.44,0-.72-.05-.14-.03-.32-.08-.50-.14-.16-.05-.32-.12-.44-.19-.10-.05-.18-.12-.22-.18-.20-.30-.04-.47.02-.28.02.07.12.14.26.20.10.04.23.09.36.12.26.07.53.12.69.10.22-.02.41.02.77-.02.13-.02.29-.07.46-.09.09-.01.30-.07.39-.29.07-.15-.06-.36-.22-.48-.09-.08-.18-.20-.30-.28-.09-.07-.19-.13-.28-.19-.15-.10-.28-.20-.30-.27-.05-.22,0-.32.03-.37.07-.13.19-.25.33-.37.13-.10.29-.20.44-.30.16-.10.33-.19.47-.26.12-.07.25-.13.38-.18.21-.08.42-.13.56-.16.14-.03.27-.04.41-.02.03.02.17.03.26.08.09.06.13.16.14.19.01.06-.04.18-.07.25-.09.18-.19.31-.37.42-.05.03-.20.09-.33.11-.13.02-.24-.02-.26-.16,0-.02,0-.11,0-.14-.01-.05-.04-.06-.07-.07-.03-.01-.04-.04-.12-.03-.05.02-.24-.01-.33.03-.10.04-.18.02-.22.05-.14.08-.24.12-.31.15-.10.05-.16.09-.24.23-.09.14.13.24.19.30.05.07.17.14.27.20.14.08.29.24.44.33.10.05.31.18.42.32.12.14.17.29.14.50-.02.09-.04.13-.18.30-.02.03-.22.14-.43.26Z"/>
      <path fill="white" d="M52.56,34.46c-.06-.02-.40-.19-.36-.42.03-.13.04-.16.08-.29.03-.09.21-.43-.04-.44-.19-.02-.32-.05-.54.02-.56.18-1.07.31-1.66.70-.24.15-.58.38-.92.65-.30.22-.61.48-.81.60-.32.19-.69.57-.97.82-.37.30-.71.64-1.05,1.01-.37.42-.54.72-.75,1.04-.17.28-.34.73-.34.94,0,.42.03.67.53.89.21.09.86.05,1.13.03.31-.03.74-.11,1.11-.18.46-.10,1.09-.25,1.59-.42.67-.20.85-.30,1.75-.58.47-.16,1.34-.38,1.72-.46.07,0,.48-.08.52.02,0,.01,0,.15-.03.21-.04.07-.27.14-.31.13-.26-.04-1.13.09-1.71.29-.70.25-.98.35-1.62.61-.62.26-1.15.47-1.76.66-.46.15-.89.27-1.31.33-.21.03-.53.09-.83.10s-.58-.05-.75-.08c-.71-.13-1.11-.64-1.03-1.37.03-.22.04-.42.14-.64.09-.24.26-.53.41-.76.26-.45.60-.88.97-1.25.36-.37.75-.72,1.16-1.06.43-.33.86-.66,1.30-.94.73-.48,1.43-.86,2.03-1.12.15-.07.43-.21.70-.31.23-.07.46-.10.71-.15.35-.08.67-.13.92-.12.18,0,.43.07.58.16.09.05.24.12.33.33.07.16.13.12.10.33-.01.07,0,.12,0,.14-.06.24-.26.41-.43.52-.13.06-.50.07-.54.05Z"/>
      <path fill="white" d="M57.77,34.31l-.14.10c-.32.22-.70.49-.93.82-.28.38-.49.61-.75.99-.12.18-.25.39-.36.60-.12.22-.24.46-.33.65-.09.19-.25.55-.27.79,0,.08.02.19.14.27.07.04.26.04.32.02.21-.05.40-.13.73-.31.31-.16.64-.32.97-.52.14-.08.57-.30.69-.31.10,0,.17.04.18.09.01.04-.07.13-.10.14-.09.04-.39.11-.51.18-.36.19-.75.44-1.21.73-.22.15-.49.31-.69.47-.26.22-.54.33-.66.37-.06.02-.20.06-.33.04-.09-.01-.27-.11-.32-.17-.15-.19-.16-.47-.14-.60.02-.17.09-.40.18-.66.08-.20.26-.53.37-.74.23-.41.41-.71.69-1.12.21-.31.43-.62.67-.94.27-.36.50-.70.67-.93.11-.16.20-.26.22-.29.09-.10.20-.25.38-.32.20-.09.46-.06.55-.04.04.01.12.10.18.16.02.02.06.06.05.11-.03.24-.02.24-.25.39Z"/>
      <path fill="white" d="M58.86,38c-.09.20-.13.37-.09.44.02.05.04.08.09.08.12,0,.40-.06.53-.11.15-.06.35-.15.58-.26.13-.07.27-.15.42-.24.13-.08.31-.19.50-.28.19-.10.36-.19.42-.23.03-.02.13-.04.20-.04.04,0,.07.04.07.05,0,.02.05.10,0,.15-.04.03-.08.04-.10.05-.10.05-.28.10-.35.14-.25.13-.42.18-.71.39-.20.15-.60.39-.78.52-.38.26-.60.47-.78.56-.07.04-.22.13-.26.14-.05.03-.26.08-.41-.02-.05-.04-.15-.05-.22-.14-.05-.07-.08-.20-.10-.29-.03-.15.04-.56.18-.84.11-.22.31-.61.42-.75.07-.09.26-.35.28-.49.01-.12.22-.33.29-.40.03-.04.26-.22.36-.29.14-.09.25-.03.32-.04.21-.03.38.18.34.30-.03.09-.16.19-.27.30-.07.07-.15.17-.24.28-.11.14-.21.28-.28.36-.16.21-.30.45-.40.66ZM60.03,35.20c0-.07.01-.14.02-.19.03-.21.14-.40.27-.54.15-.15.31-.26.41-.31.06-.02.15-.04.24-.03.16.01.35.08.41.20.04.09-.06.31-.09.36-.08.12-.12.16-.15.20-.11.13-.26.25-.48.38-.05.03-.29.10-.41.10-.10,0-.21-.10-.21-.16Z"/>
      <path fill="white" d="M65.55,37.36c-.07.24-.12.36-.13.48-.02.13-.08.30-.08.36,0,.17.02.28.06.35.05.09.16.11.30.06.29-.10.59-.25.74-.36.50-.35.79-.52.96-.69.05-.04.28-.10.34-.07.02.02.03.16-.02.18-.13.09-.19.10-.37.21l-.75.53c-.37.27-.77.55-1.06.75-.27.18-.32.21-.59.22-.30.02-.47-.32-.44-.71.01-.11.03-.33.06-.53.02-.21.11-.58.17-.83.03-.18.03-.18.03-.23,0-.12-.06-.19-.18-.16-.10.02-.34.18-.39.22-.23.16-.31.21-.55.39-.19.15-.38.35-.53.48-.14.12-.47.45-.55.57-.15.22-.15.20-.25.33-.10.13-.26.31-.33.37-.09.07-.23.15-.37.09-.15-.06-.31-.26-.30-.42.02-.21.14-.38.20-.55.04-.09.18-.36.33-.56.09-.12.36-.50.49-.71.07-.13.26-.42.26-.43.08-.11.12-.24.21-.36.07-.10.19-.14.27-.16.16-.04.29-.07.42-.04.08.02.20.08.22.14.02.07.02.16,0,.22-.03.07-.05.16-.14.26-.03.04-.20.14-.24.18-.13.14-.26.29-.36.42-.02.03-.13.24-.13.33,0,.03.03.03.05.03.07,0,.61-.43.70-.48.29-.21.49-.36.75-.56.13-.10.29-.24.41-.33.10-.08.24-.18.31-.24.11-.09.32-.15.40-.18.12-.03.29.02.41.14.05.05.10.12.08.20-.02.14-.07.27-.12.33-.10.13-.22.45-.32.75Z"/>
      <path fill="white" d="M68.75,38c-.09.20-.13.37-.09.44.02.05.04.08.09.08.12,0,.40-.06.53-.11.15-.06.35-.15.58-.26.13-.07.27-.15.42-.24.13-.08.31-.19.50-.28.19-.10.36-.19.42-.23.03-.02.13-.04.20-.04.04,0,.07.04.07.05,0,.02.05.10,0,.15-.04.03-.08.04-.10.05-.10.05-.28.10-.35.14-.25.13-.42.18-.71.39-.20.15-.60.39-.78.52-.38.26-.60.47-.78.56-.07.04-.22.13-.26.14-.05.03-.26.08-.41-.02-.05-.04-.15-.05-.22-.14-.05-.07-.08-.20-.10-.29-.03-.15.04-.56.18-.84.11-.22.31-.61.42-.75.07-.09.26-.35.28-.49.01-.12.22-.33.29-.40.03-.04.26-.22.36-.29.14-.09.25-.03.32-.04.21-.03.38.18.34.30-.03.09-.16.19-.27.30-.07.07-.15.17-.24.28-.11.14-.21.28-.28.36-.16.21-.30.45-.40.66ZM69.91,35.20c0-.07.01-.14.02-.19.03-.21.14-.40.27-.54.15-.15.31-.26.41-.31.06-.02.15-.04.24-.03.16.01.35.08.41.20.04.09-.06.31-.09.36-.08.12-.12.16-.15.20-.11.13-.26.25-.48.38-.05.03-.29.10-.41.10-.10,0-.21-.10-.21-.16Z"/>
      <path fill="white" d="M76.54,37.61s-.05.11-.14.14c-.11.04-.21-.03-.37.02-.17.05-.35.12-.54.21-.25.12-.56.26-.86.39-.40.19-.96.50-1.19.61-.38.17-.61.30-.92.42-.15.05-.29.07-.53.10-.20.02-.46-.10-.59-.25-.09-.10-.19-.33-.15-.51.04-.14.10-.38.20-.55.14-.23.29-.42.52-.66.19-.21.42-.42.67-.62.31-.25.71-.52,1.03-.70.43-.24.88-.32,1.20-.35.22-.02.37.02.46.08.09.07.28.24.26.33-.01.09-.01.29-.09.37-.06.08-.19.16-.29.20-.11.03-.26.03-.33.03-.06,0-.14-.04-.18-.07-.05-.03-.13-.14-.13-.20,0-.03,0-.08.02-.14v-.02c-.07-.03-.18-.03-.27.01-.16.07-.36.24-.53.33-.23.14-.32.25-.53.42-.16.14-.27.24-.41.41-.15.19-.30.32-.39.50-.10.20-.21.32-.22.46-.02.18.08.27.21.27.20.01.48-.04.83-.18.49-.20,1.43-.60,1.97-.81.25-.09.23-.11.43-.18.43-.15.55-.19.72-.19.06,0,.14.07.14.12Z"/>
      <path fill="white" d="M78.53,39.12c-.14.07-.29.12-.42.18-.15.07-.38.10-.59.13-.17.02-.37.02-.50.04-.15.03-.44,0-.72-.05-.14-.03-.32-.08-.50-.14-.16-.05-.32-.12-.44-.19-.10-.05-.18-.12-.22-.18-.20-.30-.04-.47.02-.28.02.07.12.14.26.20.10.04.23.09.36.12.26.07.53.12.69.10.22-.02.41.02.77-.02.13-.02.29-.07.46-.09.09-.01.30-.07.39-.29.07-.15-.06-.36-.22-.48-.09-.08-.18-.20-.30-.28-.09-.07-.19-.13-.28-.19-.15-.10-.28-.20-.30-.27-.05-.22,0-.32.03-.37.07-.13.19-.25.33-.37.13-.10.29-.20.44-.30.16-.10.33-.19.47-.26.12-.07.25-.13.38-.18.21-.08.42-.13.56-.16.14-.03.27-.04.41-.02.03.02.17.03.26.08.09.06.13.16.14.19.01.06-.04.18-.07.25-.09.18-.19.31-.37.42-.05.03-.20.09-.33.11-.13.02-.24-.02-.26-.16,0-.02,0-.11,0-.14-.01-.05-.04-.06-.07-.07-.03-.01-.04-.04-.12-.03-.05.02-.24-.01-.33.03-.10.04-.18.02-.22.05-.14.08-.24.12-.31.15-.10.05-.16.09-.24.23-.09.14.13.24.19.30.05.07.17.14.27.20.14.08.29.24.44.33.10.05.31.18.42.32.12.14.17.29.14.50-.02.09-.04.13-.18.30-.02.03-.22.14-.43.26Z"/>
      <path fill="white" d="M12.88,63.10c0,.30-.12.55-.36.78-.23.21-.52.36-.86.43-.14.03-.28.05-.42.05-.20,0-.40-.03-.59-.10-.35-.12-.59-.31-.73-.55.15.06.35.09.60.09.15,0,.30-.02.46-.05.51-.11.77-.40.77-.87v-4.27c.17,0,.35.02.56.07.38.09.57.24.57.45v3.98ZM12.82,57.75c0,.05-.03.10-.09.15-.07.05-.15.08-.25.08h-.73v-.66s.03-.09.09-.14c.08-.06.16-.09.25-.09h.74v.66Z"/>
      <path fill="white" d="M16.62,62.50h-.15c-.12,0-.30-.02-.52-.07-.05-.01-.11-.02-.19-.04v.71c0,.30-.12.55-.36.78-.23.21-.52.36-.86.43-.14.03-.28.05-.42.05-.20,0-.40-.03-.59-.10-.35-.12-.59-.31-.73-.55.15.06.35.09.60.09.15,0,.30-.02.46-.05.51-.11.77-.40.77-.87v-4.27c.17,0,.35.02.56.07.38.09.57.24.57.45v2.52c.23.05.43.07.61.07h.26v.79Z"/>
      <path fill="white" d="M16.39,61.72h1.89v.78h-1.89v-.78Z"/>
      <path fill="white" d="M21.21,62.50c-.53,0-.95-.10-1.26-.31-.32.20-.71.31-1.17.31h-.14s-.58,0-.58,0v-.78h.62c.40,0,.60-.20.60-.58v-2.02c0-.20.19-.34.58-.44.20-.05.39-.08.56-.08v2.62c0,.15.06.27.19.37.12.08.25.13.41.13h.55v.78h-.37ZM19.64,57.75c0,.05-.03.10-.09.15-.07.05-.15.08-.25.08h-.74v-.65s.03-.09.09-.14c.07-.06.15-.09.24-.09h.74v.66ZM21.14,57.75c0,.05-.03.10-.09.15-.07.05-.15.08-.25.08h-.74v-.65s.03-.09.09-.14c.07-.06.15-.09.24-.09h.75v.66Z"/>
      <path fill="white" d="M21.35,61.72h1.89v.78h-1.89v-.78Z"/>
      <path fill="white" d="M23.01,61.72h.73v-2.60c0-.21.19-.36.58-.45.20-.05.39-.07.56-.07v3.04c.23.05.43.07.61.07.40,0,.60-.19.60-.57v-2.02c0-.20.19-.34.58-.44.20-.05.39-.08.56-.08v2.63c0,.15.06.27.19.37.12.08.25.13.41.13.40,0,.60-.23.60-.69v-1.92c0-.20.19-.35.58-.44.20-.05.39-.07.56-.08v2.57c0,.42-.15.75-.45.98-.28.23-.65.34-1.11.34-.53,0-.95-.10-1.26-.31-.32.21-.71.31-1.17.31-.12,0-.30-.02-.52-.07-.23-.05-.40-.08-.52-.08-.25,0-.44.02-.57.06-.13.04-.22.07-.29.08-.03,0-.07,0-.10,0h-.57v-.78Z"/>
      <path fill="white" d="M32.18,62.50c-.12,0-.30-.02-.52-.07-.23-.05-.40-.08-.52-.08-.38,0-.65.05-.80.14v-4.76c0-.21.19-.36.57-.45.20-.05.39-.07.56-.07v4.43c.23.05.43.07.61.07h.37v.79h-.27Z"/>
      <path fill="white" d="M32.23,61.72h1.89v.78h-1.89v-.78Z"/>
      <path fill="white" d="M33.89,61.72h1.89v.78h-1.89v-.78Z"/>
      <path fill="white" d="M37.27,62.35c-.06-.01-.12-.02-.18-.02-.03,0-.07,0-.10,0-.09.01-.20.04-.33.08-.13.04-.22.07-.29.08-.03,0-.07,0-.10,0h-.71v-.78h.97c-.06-.19-.09-.36-.09-.53v-1.29c0-.42.15-.75.45-.97.31-.24.78-.36,1.40-.36s1.10.12,1.41.36c.30.23.45.55.45.97v1.28c0,.89-.62,1.33-1.86,1.33-.40,0-.74-.05-1.02-.15ZM37.57,61.07c0,.23.05.39.14.50.11.12.30.18.57.18s.47-.06.58-.18c.09-.10.14-.27.14-.50v-1.06c0-.23-.05-.39-.14-.49-.11-.11-.31-.17-.58-.17s-.46.06-.57.17c-.09.10-.14.26-.14.49v1.06Z"/>
      <path fill="white" d="M45.65,62.50c-1.07,0-1.78-.27-2.11-.81-.15-.24-.22-.52-.22-.82,0-.15.02-.31.05-.47.11-.52.35-.84.70-.95-.08.24-.11.49-.11.74,0,.37.10.68.30.94.31.39.77.59,1.38.59h2.56c.41,0,.61-.19.61-.58v-2.02c0-.20.19-.34.58-.44.20-.05.39-.08.56-.08v2.65c0,.45-.17.77-.51.98-.28.17-.66.26-1.13.26h-2.66ZM46.32,58.76c0,.05-.03.10-.09.15-.07.05-.15.08-.25.08h-.74v-.65s.03-.09.09-.14c.07-.06.15-.09.24-.09h.74v.66ZM47.82,58.76c0,.05-.03.10-.09.15-.07.05-.15.08-.25.08h-.74v-.65s.03-.09.09-.14c.07-.06.15-.09.24-.09h.75v.66Z"/>
      <path fill="white" d="M51.88,62.06c0,.21-.20.36-.59.45-.20.05-.40.07-.57.07v-4.85c0-.21.20-.36.59-.45.21-.05.40-.07.57-.07v4.84Z"/>
      <path fill="white" d="M53.29,62.50c-.27,0-.44-.09-.54-.28-.07-.14-.10-.33-.10-.60.12.07.42.10.90.10h1.34v-1.59c0-.32-.09-.54-.27-.66-.12-.08-.31-.12-.57-.12-.24,0-.45.07-.62.22-.20.17-.30.37-.30.59-.17-.25-.25-.50-.25-.75,0-.31.18-.53.53-.68.26-.11.56-.16.90-.16.55,0,.98.12,1.28.36.29.23.44.56.44.97v2.61h-2.74Z"/>
      <path fill="white" d="M58.64,62.50c-.12,0-.30-.02-.52-.07-.23-.05-.40-.08-.52-.08-.38,0-.65.05-.80.14v-4.76c0-.21.19-.36.57-.45.20-.05.39-.07.56-.07v4.43c.23.05.44.07.61.07h.37v.79h-.27Z"/>
      <path fill="white" d="M58.68,61.72h1.89v.78h-1.89v-.78Z"/>
      <path fill="white" d="M63.50,62.50c-.53,0-.95-.10-1.26-.31-.32.20-.71.31-1.17.31h-.14s-.58,0-.58,0v-.78h.62c.40,0,.60-.20.60-.58v-2.02c0-.20.19-.34.58-.44.20-.05.39-.08.56-.08v2.62c0,.15.06.27.19.37.12.08.25.13.41.13h.55v.78h-.37ZM61.84,63.74c0,.05-.03.10-.09.15-.07.05-.15.08-.25.08h-.74v-.65s.03-.09.09-.14c.07-.06.15-.09.24-.09h.74v.66ZM63.34,63.74c0,.05-.03.10-.09.15-.07.05-.15.08-.25.08h-.74v-.65s.03-.09.09-.14c.07-.06.15-.09.24-.09h.75v.66Z"/>
      <path fill="white" d="M63.64,61.72h1.89v.78h-1.89v-.78Z"/>
      <path fill="white" d="M65.31,61.72h1.89v.78h-1.89v-.78Z"/>
      <path fill="white" d="M66.97,62.50v-.78h1.60c-.53-.16-.80-.53-.80-1.11v-.75c0-.42.14-.74.43-.97.30-.24.73-.36,1.28-.36.35,0,.65.05.91.16.35.15.53.37.53.68,0,.25-.08.50-.25.75,0-.22-.10-.42-.30-.59-.17-.14-.38-.22-.62-.22-.26,0-.45.04-.57.13-.18.12-.27.35-.27.68v.92c.02.17.08.30.17.39.17.19.44.29.79.29h1.20c0,.11-.03.23-.08.37-.11.28-.29.42-.56.42h-3.46Z"/>
    </svg>
  </div>
);


// Interfaces
interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: number;
  created_at: string;
  appointment?: {
    id: string;
    status: string;
    type: string;
    bookingId: string;
    related: {
      id: number;
      title: string;
      image: string;
    };
  };
  // Add these properties to match the API response
  serviceTitle?: string;
  serviceImage?: string;
  appointment_id?: string;
  appointmentId?: string;
}
interface ClientInfo {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  identity_number: string;
  unique_number?: string;
  created_at?: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  identity_number: string;
}

interface MenuData {
  branches: any[];
  departments: any[];
  doctors: any[];
  offers: any[];
  blogs: any[];
  services: any[];
}

interface SearchResults {
  doctors?: any[];
  services?: any[];
  offers?: any[];
  departments?: any[];
  blogs?: any[];
  testimonials?: any[];
}

interface HeaderProps {
  hclass?: string;
  nav?: boolean;
  showAuthprop?: boolean;
}

interface WishlistItem {
  item_type: string;
  item_id: string | number;
  [key: string]: any;
}

// Notifications Hook
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const getClientId = (): string | null => {
    const clientInfo = localStorage.getItem("clientInfo");
    if (!clientInfo) return null;
    try {
      const parsed = JSON.parse(clientInfo);
      return parsed.id || null;
    } catch {
      return null;
    }
  };
const fetchNotifications = async (): Promise<void> => {
  try {
    const clientId = getClientId();
    if (!clientId) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    const response = await fetch(
      `https://www.ss.mastersclinics.com/api/client-auth/${clientId}/notifications`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("token") && {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        },
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      console.error("❌ Failed to fetch notifications:", {
        status: response.status,
        statusText: response.statusText,
        body: text,
      });
      return;
    }

    const data = await response.json();
    console.log("✅ Raw notifications response:", data);

    // Normalize is_read to number
    const items = (Array.isArray(data?.notifications)
      ? data.notifications
      : Array.isArray(data)
      ? data
      : []
    ).map((n: any) => ({
      ...n,
      is_read: Number(n.is_read) || 0,
    }));

    setNotifications(items);
    setUnreadCount(items.filter((n: Notification) => !n.is_read).length);
  } catch (error: any) {
    console.error("🔥 Error fetching notifications:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
  }
};


const markNotificationRead = async (notificationId: string): Promise<void> => {
  try {
    const clientId = getClientId();
    if (!clientId) return;
    console.log(`Marking notification ${notificationId} as read for client ${clientId}`);

    await fetch(
      `https://www.ss.mastersclinics.com/api/client-auth/notifications/${notificationId}/read`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem("token") && {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          })
        }
      }
    );
    
    // Fix: Use boolean true instead of number 1
// In the markNotificationRead function, use 1 instead of true
setNotifications(prev => prev.map(n => 
  n.id === notificationId ? { ...n, is_read: 1 } : n  // Use 1 instead of true
));
    setUnreadCount(prev => Math.max(0, prev - 1));
  } catch (error) {
    console.error("Failed to mark notification as read", error);
  }
};
  // Initialize and set up polling
  useEffect(() => {
    const clientId = getClientId();
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    if (clientId) {
      // Initial fetch
      setTimeout(() => {
        fetchNotifications();
      }, 1200);
      
      // Poll every 2 minutes
      intervalRef.current = setInterval(() => {
        fetchNotifications();
      }, 120000);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, []);

  // Refresh on focus/visibility changes
  useEffect(() => {
    const handleFocus = () => {
      const clientId = getClientId();
      if (clientId) fetchNotifications();
    };
    
    const handleVisibility = () => {
      const clientId = getClientId();
      if (!document.hidden && clientId) fetchNotifications();
    };
    
    const handleRefreshEvent = () => {
      const clientId = getClientId();
      if (clientId) fetchNotifications();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("refreshNotifications", handleRefreshEvent);
    
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("refreshNotifications", handleRefreshEvent);
    };
  }, []);

  return {
    notifications,
    unreadCount,
    showNotifications,
    setShowNotifications,
    fetchNotifications,
    markNotificationRead,
  };
};

const Header = (props: HeaderProps) => {
  const [menuData, setMenuData] = useState<MenuData>({
    branches: [],
    departments: [],
    doctors: [],
    offers: [],
    blogs: [],
    services: [],
  });
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showAuthPopup, setShowAuthPopup] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");

  const [authStep, setAuthStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [codeExpirationTime, setCodeExpirationTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isCodeExpired, setIsCodeExpired] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const authPopupRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const routerRef = useRef<NextRouter | null>(null);
  
  // Wishlist sidebar state
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  
  // Appointment count state with error tracking
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const [fetchRetryCount, setFetchRetryCount] = useState<number>(0);
  
  // Use the notifications hook
  const {
    notifications,
    unreadCount,
    showNotifications,
    setShowNotifications,
    fetchNotifications,
    markNotificationRead
  } = useNotifications();
  
  try {
    routerRef.current = useRouter();
  } catch (error) {
    console.warn("Router not available yet:", (error as Error).message);
  }
  
  const debounceRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();
  const appointmentIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getRouter = (): NextRouter | null => {
    return routerRef.current;
  };

  const safeNavigate = (path: string): void => {
    const router = getRouter();
    if (router) {
      router.push(path);
    } else {
      window.location.href = path;
    }
  };
  
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const toggleWishlist = (): void => setWishlistOpen(!wishlistOpen)
const [userInfo, setUserInfo] = useState<UserInfo>({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  identity_number: "",
});

// Add Saudi phone validation function
const validateSaudiPhoneNumber = (phone: string): boolean => {
  // Saudi phone number patterns:
  // 05xxxxxxxx (10 digits)
  // +9665xxxxxxxx (12 digits with country code)
  // 9665xxxxxxxx (11 digits with country code without +)
  const saudiPhoneRegex = /^(?:(?:\+?966|0)?5[0-9]{8})$/;
  return saudiPhoneRegex.test(phone.replace(/[\s\-]/g, '')); // Remove spaces and dashes before validation
};

// Update the handleUserInfoSubmit function to include phone validation
const handleUserInfoSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();
  setAuthError("");

  const { firstName, lastName, phoneNumber, identity_number } = userInfo;

  // Validate identity number
  if (!identity_number || !/^\d{10}$/.test(identity_number.trim())) {
    setAuthError("يرجى إدخال رقم هوية صالح مكون من 10 أرقام.");
    return;
  }

  // Validate Saudi phone number
  if (!validateSaudiPhoneNumber(phoneNumber)) {
    setAuthError("يرجى إدخال رقم هاتف سعودي صحيح (مثال: 05xxxxxxxx)");
    return;
  }

  try {
    const response = await fetch("https://www.ss.mastersclinics.com/api/client-auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email: email,
        code: verificationCode,
        identity_number: identity_number.trim(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    const data = await response.json();
    console.log("User creation response:", {
      response: data,
      email,
      timestamp: new Date().toISOString(),
    });

    const newClientInfo: ClientInfo = {
      id: data.clientId,
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      identity_number: identity_number.trim(),
      unique_number: data.uniqueNumber,
      created_at: new Date().toISOString(),
    };

    setClientInfo(newClientInfo);
    setIsAuthenticated(true);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("clientInfo", JSON.stringify(newClientInfo));

    syncUnauthenticatedWishlist(data.clientId);

    console.log("New user created and authenticated:", {
      email,
      clientInfo: newClientInfo,
      timestamp: new Date().toISOString(),
    });

    setShowAuthPopup(false);
    resetAuthForm();
  } catch (error) {
    console.error("Error creating user:", error);
    setAuthError((error as Error).message || "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.");
  }
};
  // Improved fetch appointment count with better error handling and rate limiting
  const fetchAppointmentCount = async (retryCount: number = 0): Promise<void> => {
    const clientId = getClientId();
    const maxRetries = 3;
    const baseDelay = 2000; // 2 seconds
    const minInterval = 120000; // 2 minutes minimum between requests
    
    if (!clientId) {
      setAppointmentCount(0);
      setLastFetchTime(null);
      return;
    }

    // Rate limiting: don't fetch if we fetched recently
    const now = Date.now();
    if (lastFetchTime && (now - lastFetchTime) < minInterval) {
      console.log("Skipping appointment count fetch - too soon since last fetch");
      return;
    }

    try {
      console.log(`Fetching appointment count (attempt ${retryCount + 1})`);
      
      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/client-auth/${clientId}/count`,
        { 
          cache: "no-store",
          headers: {
            'Content-Type': 'application/json',
            // Add auth token if available
            ...(localStorage.getItem("token") && {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            })
          }
        }
      );

      console.log("Appointment count response status:", response.status);

      // Handle rate limiting (429)
      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const delay = baseDelay * Math.pow(2, retryCount); // Exponential backoff
          console.warn(`Rate limit hit, retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
          
          setTimeout(() => {
            fetchAppointmentCount(retryCount + 1);
          }, delay);
          return;
        } else {
          console.error("Max retries reached for appointment count due to rate limiting");
          setFetchRetryCount(retryCount);
          return;
        }
      }

      if (!response.ok) {
        const text = await response.text();
        console.error("Error response text:", text);
        throw new Error(`Failed to fetch appointment count: ${response.status} - ${text}`);
      }

      const data = await response.json();
      console.log("Appointment count response:", data);

      setAppointmentCount(data.totalAppointments || 0);
      setLastFetchTime(now);
      setFetchRetryCount(0); // Reset retry count on success
      
    } catch (err) {
      console.error("Error fetching appointment count:", err);
      
      // Only reset count to 0 if it's a genuine error, not rate limiting
      if (!(err as Error).message?.includes('429') && retryCount === 0) {
        // Don't immediately set to 0, keep existing value and try again later
        console.log("Keeping existing appointment count due to fetch error");
      }
      
      setFetchRetryCount(retryCount);
    }
  };

  useEffect(() => {
    const handleShowAuthPopup = (): void => {
      setShowAuthPopup(true);
    };

    window.addEventListener('showAuthPopup', handleShowAuthPopup);
    
    return () => {
      window.removeEventListener('showAuthPopup', handleShowAuthPopup);
    };
  }, []);

  const getClientId = (): string | null => {
    const clientInfo = localStorage.getItem("clientInfo");
    if (!clientInfo) return null;
    try {
      const parsed = JSON.parse(clientInfo);
      return parsed.id || null;
    } catch {
      return null;
    }
  };

  // Update appointment count when authentication status changes with improved timing
  useEffect(() => {
    // Clear any existing interval
    if (appointmentIntervalRef.current) {
      clearInterval(appointmentIntervalRef.current);
      appointmentIntervalRef.current = null;
    }

    if (isAuthenticated) {
      // Initial fetch with slight delay to allow auth to settle
      setTimeout(() => {
        fetchAppointmentCount();
      }, 1000);
      
      // Set up interval to refresh appointment count every 3 minutes (increased from 30 seconds)
      appointmentIntervalRef.current = setInterval(() => {
        fetchAppointmentCount();
      }, 180000); // 3 minutes
    } else {
      setAppointmentCount(0);
      setLastFetchTime(null);
      setFetchRetryCount(0);
    }

    // Cleanup function
    return () => {
      if (appointmentIntervalRef.current) {
        clearInterval(appointmentIntervalRef.current);
        appointmentIntervalRef.current = null;
      }
    };
  }, [isAuthenticated]);

  const syncUnauthenticatedWishlist = async (userId: string): Promise<void> => {
    const unauthWishlist: WishlistItem[] = JSON.parse(localStorage.getItem("unauthWishlist") || "[]");
    
    if (unauthWishlist.length === 0) {
      console.log("[Header] No unauthenticated wishlist items to sync");
      return;
    }
    
    console.log(`[Header] Syncing ${unauthWishlist.length} items from unauthenticated wishlist`);
    
    try {
      const syncPromises = unauthWishlist.map(async (item: WishlistItem) => {
        try {
          const response = await fetch("https://www.ss.mastersclinics.com/api/wishlist", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
              client_id: userId,
              item_type: item.item_type,
              item_id: item.item_id
            })
          });
          
          if (!response.ok) {
            throw new Error(`Failed to sync item ${item.item_id}`);
          }
          
          return { success: true, item };
        } catch (err) {
          console.error(`[Header] Failed to sync item ${item.item_id}:`, err);
          return { success: false, item, error: (err as Error).message };
        }
      });
      
      const results = await Promise.all(syncPromises);
      const successfulSyncs = results.filter(r => r.success);
      const failedSyncs = results.filter(r => !r.success);
      
      console.log(`[Header] Sync completed: ${successfulSyncs.length} successful, ${failedSyncs.length} failed`);
      
      if (successfulSyncs.length > 0) {
        const remainingItems = unauthWishlist.filter(unauthItem => 
          !successfulSyncs.some(successItem => 
            successItem.item.item_id === unauthItem.item_id && 
            successItem.item.item_type === unauthItem.item_type
          )
        );
        
        localStorage.setItem("unauthWishlist", JSON.stringify(remainingItems));
        console.log("[Header] Successfully synced items removed from unauthenticated wishlist");
      }
      
      fetchWishlist();
      
    } catch (err) {
      console.error("[Header] Failed to sync unauthenticated wishlist:", err);
    }
  };

  const fetchWishlist = async (): Promise<void> => {
    const clientId = getClientId();
    
    if (!clientId) {
      const unauthWishlist: WishlistItem[] = JSON.parse(localStorage.getItem("unauthWishlist") || "[]");
      setWishlistItems(unauthWishlist);
      setWishlistCount(unauthWishlist.length);
      
      sessionStorage.setItem("wishlist", JSON.stringify(unauthWishlist));
      sessionStorage.setItem("wishlistCount", unauthWishlist.length.toString());
      return;
    }

    try {
      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/wishlist/${clientId}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }
      
      const data = await response.json();
      const wishlistItems: WishlistItem[] = data.data || [];
      
      sessionStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      sessionStorage.setItem("wishlistCount", wishlistItems.length.toString());
      
      setWishlistItems(wishlistItems);
      setWishlistCount(wishlistItems.length);
      
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  useEffect(() => {
    const initializeWishlist = (): void => {
      const clientId = getClientId();
      if (clientId) {
        fetchWishlist();
      } else {
        const unauthWishlist: WishlistItem[] = JSON.parse(localStorage.getItem("unauthWishlist") || "[]");
        setWishlistItems(unauthWishlist);
        setWishlistCount(unauthWishlist.length);
        
        sessionStorage.setItem("wishlist", JSON.stringify(unauthWishlist));
        sessionStorage.setItem("wishlistCount", unauthWishlist.length.toString());
      }
    };

    initializeWishlist();

    const handleWishlistUpdate = (event: CustomEvent): void => {
      const { count, items, action, itemId, itemType } = event.detail;
      console.log("Header received wishlist update:", { count, action, itemId, itemType });
      
      setWishlistItems(items);
      setWishlistCount(count);
      
      sessionStorage.setItem("wishlist", JSON.stringify(items));
      sessionStorage.setItem("wishlistCount", count.toString());
    };

    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === "wishlist" || e.key === "wishlistCount") {
        const storedWishlist: WishlistItem[] = JSON.parse(sessionStorage.getItem("wishlist") || "[]");
        const storedCount = parseInt(sessionStorage.getItem("wishlistCount") || "0");
        setWishlistItems(storedWishlist);
        setWishlistCount(storedCount);
      }
      
      if (e.key === "unauthWishlist") {
        const unauthWishlist: WishlistItem[] = JSON.parse(localStorage.getItem("unauthWishlist") || "[]");
        if (!isAuthenticated) {
          setWishlistItems(unauthWishlist);
          setWishlistCount(unauthWishlist.length);
          
          sessionStorage.setItem("wishlist", JSON.stringify(unauthWishlist));
          sessionStorage.setItem("wishlistCount", unauthWishlist.length.toString());
        }
      }
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate as EventListener);
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate as EventListener);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated]);

  const normalizeDepartmentName = (name: string, type: string): string => {
    const prefixMap: {[key: string]: string} = {
      doctors: "أطباء",
      services: "خدمات",
      offers: "عروض",
    };
    const prefix = prefixMap[type];
    if (!prefix) return name;
    const cleanedName = name.replace(/^قسم\s+/, "").trim();
    return `${prefix} ${cleanedName}`;
  };
  
  useEffect(() => {
    const fetchMenuData = async (): Promise<void> => {
      try {
        const res = await fetch("https://www.ss.mastersclinics.com/navbar-data");
        const data = await res.json();
        
        setMenuData({
          branches: data.branches || [],
          departments: data.departments || [],
          doctors: data.doctors || [],
          offers: data.offers || [],
          blogs: data.blogs || [],
          services: data.services || [],
        });
      } catch (error) {
        console.error("Failed to fetch navbar data", error);
      }
    };

    fetchMenuData();
  }, []);

  const mainDepartments = ["قسم الجلدية", "قسم الاسنان", "قسم النساء والولادة", "قسم التغذية"];

  const groupedDepartments = {
    main: (menuData.departments || []).filter((dept: any) => mainDepartments.includes(dept.name)),
    general: (menuData.departments || []).filter((dept: any) => !mainDepartments.includes(dept.name)),
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedAuthState = localStorage.getItem("isAuthenticated");
    const savedClientInfo = localStorage.getItem("clientInfo");

    if (savedEmail && savedAuthState === "true") {
      setEmail(savedEmail);
      setIsAuthenticated(true);

      if (savedClientInfo) {
        try {
          const parsedClientInfo: ClientInfo = JSON.parse(savedClientInfo);
          setClientName(parsedClientInfo.first_name + " " + parsedClientInfo.last_name);
          setClientInfo(parsedClientInfo);
          console.log("Restored client info from localStorage:", {
            clientData: parsedClientInfo,
            timestamp: new Date().toISOString(),
            source: "localStorage",
          });
          
          syncUnauthenticatedWishlist(parsedClientInfo.id);
        } catch (error) {
          console.error("Error parsing saved client info:", error);
          localStorage.removeItem("clientInfo");
        }
      }

      console.log("User session restored on page load:", {
        email: savedEmail,
        isAuthenticated: true,
        hasClientInfo: !!savedClientInfo,
        timestamp: new Date().toISOString(),
      });
    } else {
      const unauthWishlist: WishlistItem[] = JSON.parse(localStorage.getItem("unauthWishlist") || "[]");
      setWishlistItems(unauthWishlist);
      setWishlistCount(unauthWishlist.length);
      
      sessionStorage.setItem("wishlist", JSON.stringify(unauthWishlist));
      sessionStorage.setItem("wishlistCount", unauthWishlist.length.toString());
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      if (isAuthenticated && email) {
        try {
          
          localStorage.setItem("userEmail", email);
          localStorage.setItem("isAuthenticated", "true");
          if (clientInfo) {
            localStorage.setItem("clientInfo", JSON.stringify(clientInfo));
          }

          console.log("Saved user session before page unload:", {
            email,
            isAuthenticated,
            clientInfo: clientInfo ? "saved" : "none",
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          console.error("Error saving user session:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isAuthenticated, email, clientInfo]);

  useEffect(() => {
    if (codeExpirationTime && authStep === 2) {
      const updateTimer = (): void => {
        const now = Date.now();
        const remaining = Math.max(0, codeExpirationTime - now);
        setTimeRemaining(remaining);

        if (remaining === 0) {
          setIsCodeExpired(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        }
      };

      updateTimer();
      timerRef.current = setInterval(updateTimer, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [codeExpirationTime, authStep]);

  const handleEmailSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setAuthError("");

    try {
      const response = await fetch("https://www.ss.mastersclinics.com/api/client-auth/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send verification code");
      }

      const data = await response.json();
      console.log("Authorization response:", {
        response: data,
        email,
        timestamp: new Date().toISOString(),
      });

      const expirationTime = Date.now() + 5 * 60 * 1000;
      setCodeExpirationTime(expirationTime);
      setIsCodeExpired(false);
      setTimeRemaining(5 * 60 * 1000);

      setAuthStep(2);
    } catch (error) {
      console.error("Error sending verification code:", error);
      setAuthError((error as Error).message || "حدث خطأ أثناء إرسال رمز التحقق. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setAuthError("");

    if (isCodeExpired) {
      setAuthError("انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.");
      return;
    }

    try {
      const response = await fetch("https://www.ss.mastersclinics.com/api/client-auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message?.includes("expired") || errorData.code === "CODE_EXPIRED") {
          setIsCodeExpired(true);
          setAuthError("انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.");
          return;
        }
        throw new Error(errorData.message || "Invalid verification code");
      }

      const data = await response.json();
      console.log("Verification response:", {
        response: data,
        email,
        timestamp: new Date().toISOString(),
      });

      if (data.requiresUserInfo) {
        setAuthStep(3);
      } else {
        if (data.client) {
          setClientInfo(data.client);
          console.log("Fetched existing client info:", {
            clientData: data.client,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem("clientInfo", JSON.stringify(data.client));
          
          syncUnauthenticatedWishlist(data.client.id);
        }

        setIsAuthenticated(true);
        setWishlistOpen(false);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isAuthenticated", "true");

        console.log("User authenticated successfully:", {
          email,
          clientInfo: data.client ? "loaded" : "none",
          timestamp: new Date().toISOString(),
        });

        setShowAuthPopup(false);
        resetAuthForm();
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setAuthError((error as Error).message || "رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.");
    }
  };


  const handleResendCode = async (): Promise<void> => {
    setIsResending(true);
    setAuthError("");

    try {
      const response = await fetch("https://www.ss.mastersclinics.com/api/client-auth/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to resend verification code");
      }

      const data = await response.json();
      console.log("Resend verification code response:", {
        response: data,
        email,
        timestamp: new Date().toISOString(),
      });

      const expirationTime = Date.now() + 5 * 60 * 1000;
      setCodeExpirationTime(expirationTime);
      setIsCodeExpired(false);
      setTimeRemaining(5 * 60 * 1000);
      setVerificationCode("");

      setAuthError("");
      setAuthError("تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.");
      setTimeout(() => setAuthError(""), 3000);
    } catch (error) {
      console.error("Error resending verification code:", error);
      setAuthError((error as Error).message || "حدث خطأ أثناء إعادة إرسال رمز التحقق.");
    } finally {
      setIsResending(false);
    }
  };

  const resetAuthForm = (): void => {
    setAuthStep(1);
    setEmail("");
    setVerificationCode("");
    setUserInfo({ firstName: "", lastName: "", phoneNumber: "", identity_number: "" });
    setAuthError("");
    setCodeExpirationTime(null);
    setTimeRemaining(0);
    setIsCodeExpired(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleLogout = (): void => {
    setWishlistOpen(false);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("clientInfo");

    console.log("User logged out:", {
      email,
      timestamp: new Date().toISOString(),
    });

    setIsAuthenticated(false);
    setClientInfo(null);
    setShowAuthPopup(false);
    resetAuthForm();

    const unauthWishlist: WishlistItem[] = JSON.parse(localStorage.getItem("unauthWishlist") || "[]");
    setWishlistItems(unauthWishlist);
    setWishlistCount(unauthWishlist.length);

    sessionStorage.setItem("wishlist", JSON.stringify(unauthWishlist));
    sessionStorage.setItem("wishlistCount", unauthWishlist.length.toString());

    const router = getRouter();
    if (router && router.asPath && router.asPath.startsWith("/profile")) {
      router.push("/");
    }
  };

  const handleSearch = async (searchQuery: string): Promise<void> => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }
    try {
      const res = await fetch(`https://www.ss.mastersclinics.com/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      console.log(data);
      
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const debouncedSearch = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(value);
    }, 500);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      handleSearch(query);
    }
  };

  const handleItemClick = async (entity: string, id: string | number): Promise<void> => {
    const router = getRouter();

    if (entity === "testimonials") {
      if (router && router.pathname !== "/") {
        setIsNavigating(true);
        await router.push("/?scroll=testimonials");
        setIsNavigating(false);
      } else {
        // Already on homepage, just scroll
        const testimonialsSection = document.getElementById("testimonials-section");
        if (testimonialsSection) {
          testimonialsSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      if (router) {
        await router.push(`/${entity}/${id}`);
      }
    }

    setShowSearch(false);
    setQuery("");
    setResults(null);
  };

  const ClickHandler = (): void => {
    window.scrollTo(10, 0);
  };

  const toggleSearch = (): void => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setQuery("");
      setResults(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
        setResults(null);
      }
      if (authPopupRef.current && !authPopupRef.current.contains(e.target as Node)) {
        setShowAuthPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  useEffect(() => {
    const checkScreenSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  
  const groupedBranches = (menuData.branches || []).reduce((acc: {[key: string]: any[]}, branch: any) => {
    if (!acc[branch.region_name]) {
      acc[branch.region_name] = [];
    }
    acc[branch.region_name].push(branch);
    return acc;
  }, {});

  const renderEntityDropdown = (items: any[], entityType: string): JSX.Element => (
    <ul 
      className={`absolute top-full right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px] ${
        items.length > 8 ? 'max-h-80 overflow-y-auto' : ''
      }`}
    >
      {items.map((item: any) => (
        <li key={item.department_id}>
          <Link
            href={`/${entityType}?departmentId=${item.department_id}`}
            className="block px-4 py-2 text-black hover:!text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
            onClick={ClickHandler}
          >
            {normalizeDepartmentName(item.department_name, entityType)}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderBranchesDropdown = (): JSX.Element => (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px]">
      {Object.keys(groupedBranches).map((region: string) => (
        <div key={region} className="relative group/region">
          <div className="block flex justify-between items-center px-4 py-2 text-black hover:!text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right cursor-default">
            {region} <FaChevronLeft className="mr-1 text-xs" />
          </div>
          <ul className="absolute top-0 right-full bg-white shadow-lg rounded-md py-2 hidden group-hover/region:block min-w-[200px] border-t-2 border-[#CBA853]">
            {groupedBranches[region].map((branch: any) => (
              <li key={branch.id}>
                <Link
                  href={`/branches/${branch.id}`}
                  className="block px-4 py-2 text-black hover:!text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
                  onClick={ClickHandler}
                >
                  {branch.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderDepartmentsDropdown = (): JSX.Element => (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px]">
      {groupedDepartments.main.map((dept: any) => (
        <li key={dept.id}>
          <Link
            href={`/departments/${dept.id}`}
            className="block px-4 py-2 text-black hover:!text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
            onClick={ClickHandler}
          >
            {dept.name}
          </Link>
        </li>
      ))}
      <div className="relative group/general">
        <div className="px-4 py-2 flex justify-between items-center text-black cursor-default">
          الأقسام العامة
          <FaChevronLeft className="mr-1 text-xs" />
        </div>
        <ul className="absolute top-0 right-full bg-white shadow-lg rounded-md py-2 hidden group-hover/general:block min-w-[200px] border-t-2 border-[#CBA853]">
          {groupedDepartments.general.map((dept: any) => (
            <li key={dept.id}>
              <Link
                href={`/departments/${dept.id}`}
                className="block px-4 py-2 text-black hover:!text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
                onClick={ClickHandler}
              >
                {dept.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderWishlistIcon = (): JSX.Element => {
    const count = wishlistCount;
    
    return (
      <div className="relative">
        <div
          onClick={() => {
            if (isAuthenticated) {
              safeNavigate("/profile?tab=wishlist");
            } else {
              if (count > 0) {
                setWishlistOpen(true);
              } else {
                setShowAuthPopup(true);
              }
            }
          }}
          className="flex items-center gap-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <FaHeart className="text-[#dec06a]" size={20} />
          {count > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-medium">
              {count > 99 ? "99+" : count}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAppointmentIcon = (): JSX.Element => {
    return (
      <div className="relative">
        <div
          onClick={() => safeNavigate("/profile?tab=appointments")}
          className="flex items-center gap-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <FaRegCalendarAlt className="text-[#dec06a]" size={20} />
          {appointmentCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-medium">
              {appointmentCount > 99 ? "99+" : appointmentCount}
            </div>
          )}
        </div>
      </div>
    );
  };

const renderNotificationsIcon = (): JSX.Element => {
  return (
    <div className="relative">
      <div
        onClick={() => {
          const next = !showNotifications;
          setShowNotifications(next);
          if (next) {
            // refresh immediately when opening the dropdown
            fetchNotifications();
          }
        }}
        className="flex items-center gap-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <FaBell className="text-[#dec06a]" size={20} />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-medium">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>
      {showNotifications && (
        <div className="absolute top-full left-0 mt-2 w-80 max-h-96 overflow-auto bg-white shadow-lg rounded-lg border z-50">
          <div className="p-3 border-b font-semibold text-right">الإشعارات</div>
          <ul className="divide-y">
            {notifications.length === 0 && (
              <li className="p-4 text-sm text-gray-500 text-right">لا توجد إشعارات</li>
            )}
            {notifications.map((n) => {
              // Get service image from either serviceImage or appointment.related.image
              const serviceImage = n.serviceImage || n.appointment?.related?.image;
              // Get service title from either serviceTitle or appointment.related.title
              const serviceTitle = n.serviceTitle || n.appointment?.related?.title;
              
              return (
                <li 
                  key={n.id} 
                  className={`p-3 text-right cursor-pointer hover:bg-gray-50 ${!n.is_read ? 'bg-yellow-50' : ''}`}
                  onClick={async () => {
                    setShowNotifications(false);
                    await markNotificationRead(n.id);
                    const target = n.appointment_id || n.appointmentId || n.appointment?.id;
                    if (target) {
                      safeNavigate(`/profile?tab=appointments&focus=${encodeURIComponent(target)}`);
                    } else {
                      safeNavigate(`/profile?tab=appointments`);
                    }
                  }}
                >
                  {/* Service Image */}
                  {serviceImage && (
                    <div className="mb-2">
                      <img 
                        src={`https://www.ss.mastersclinics.com${serviceImage}`} 
                        alt={serviceTitle || 'Service'}
                        className="w-full h-32 object-cover rounded-md"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="text-sm font-medium">{n.title || 'إشعار'}</div>
                  
                  {/* Service Title */}
                  {serviceTitle && (
                    <div className="text-xs text-[#CBA853] font-medium mt-1">
                      الخدمة: {serviceTitle}
                    </div>
                  )}
                  
                  {n.message && <div className="text-xs text-gray-600 mt-1">{n.message}</div>}
                  
                  <div className="text-[11px] text-gray-400 mt-1">
                    {n.created_at ? new Date(n.created_at).toLocaleString('ar-SA') : ''}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
  return (
    <div className="relative w-full">
      <header id="header" dir="rtl" className="relative z-[1111] w-full">
<div
  className={`${props.hclass} m-auto !w-full pl-0 !pr-4 lg:px-[100px]`}
>
          <ContactBar nav={props.nav} />
       
          <div
            ref={searchRef}
            className="w-full px-4 bg-transparent mt-3"
          >
            <div className="relative w-full max-w-[600px] m-auto">
              <input
                type="text"
                placeholder="ابحث هنا..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 pr-12 border border-[#dec06a] bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#CBA853] transition text-lg"
              />
              <FaSearch
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-[#dec06a]"
                size={20}
              />
              {results && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto z-[9999] text-right">
                  {results.doctors && results.doctors.length > 0 && (
                    <div className="p-2">
                      <h3 className="font-semibold mb-2 border-b pb-1">الأطباء</h3>
                      {results.doctors.map((doctor: any) => (
                        <div 
                          key={doctor.id} 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleItemClick('doctors', doctor.id)}
                        >
                          {doctor.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.services && results.services.length > 0 && (
                    <div className="p-2">
                      <h3 className="font-semibold mb-2 border-b pb-1">الخدمات</h3>
                      {results.services.map((service: any) => (
                        <div 
                          key={service.id} 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleItemClick('services', service.id)}
                        >
                          {service.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.offers && results.offers.length > 0 && (
                    <div className="p-2">
                      <h3 className="font-semibold mb-2 border-b pb-1">العروض</h3>
                      {results.offers.map((offer: any) => (
                        <div 
                          key={offer.id} 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleItemClick('offers', offer.id)}
                        >
                          {offer.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.departments && results.departments.length > 0 && (
                    <div className="p-2">
                      <h3 className="font-semibold mb-2 border-b pb-1">الأقسام</h3>
                      {results.departments.map((department: any) => (
                        <div 
                          key={department.id} 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleItemClick('departments', department.id)}
                        >
                          {department.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.blogs && results.blogs.length > 0 && (
                    <div className="p-2">
                      <h3 className="font-semibold mb-2 border-b pb-1">المقالات</h3>
                      {results.blogs.map((blog: any) => (
                        <div 
                          key={blog.id} 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleItemClick('blogs', blog.id)}
                        >
                          {blog.title}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.testimonials && results.testimonials.length > 0 && (
                    <div className="p-2">
                      <h3 className="font-semibold mb-2 border-b pb-1">التوصيات</h3>
                      {results.testimonials.map((testimonial: any) => (
                        <div 
                          key={testimonial.id} 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleItemClick('testimonials', testimonial.id)}
                        >
                          {testimonial.title} - {testimonial.des}
                        </div>
                      ))}
                    </div>
                  )}
                  {(!results.doctors || results.doctors.length === 0) &&
                   (!results.services || results.services.length === 0) &&
                   (!results.offers || results.offers.length === 0) &&
                   (!results.departments || results.departments.length === 0) &&
                   (!results.blogs || results.blogs.length === 0) &&
                   (!results.testimonials || results.testimonials.length === 0) && (
                    <div className="p-4 text-center">لا توجد نتائج</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <nav className="navigation !w-full mx-auto relative mt-[35px] md:mt-3">
            <div className="container-fluid flex flex-row items-center justify-between md:justify-center !w-full px-2 md:!px-0 lg:px-4 py-2 mx-auto relative h-20">
              {/* Logo */}
              <div className="flex-shrink-0 order-2 md:order-1 md:absolute !mr-4 !mt-6 md:!mt-0 md:mr-0 right-0 md:top-1/2 md:transform md:-translate-y-1/2">
                <Link href="/" className="navbar-brand">
                  {props.nav ? (
                    <img
                      src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
                      alt="logo"
                      onClick={ClickHandler}
                      className="w-[200px] md:!w-[150px] xl:!w-[187px] xl:mr-10"
                    />
                  ) : (
                    <Logo />
                  )}
                </Link>
              </div>

              {/* Main Navigation */}
              <div className="hidden md:flex w-full max-w-[800px] mx-auto order-2 md:!mr-25 lg:!mr-auto lg:!mx-auto ">
                <ul className="flex justify-center text-sm lg:text-lg xl:text-xl font-medium items-center whitespace-nowrap !gap-1 lg:gap-4 w-full">
                  <li>
                    <Link 
                      href="/" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853]" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      الرئيسية
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853]" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      من نحن
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link 
                      href="/branches" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853] flex items-center" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      الفروع <FaChevronDown className="mr-1 text-xs" style={{ color: props.nav ? 'black' : 'white' }} />
                    </Link>
                    {menuData.branches.length > 0 && renderBranchesDropdown()}
                  </li>
                  <li className="relative group">
                    <Link 
                      href="/departments" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853] flex items-center" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      الاقسام <FaChevronDown className="mr-1 text-xs" style={{ color: props.nav ? 'black' : 'white' }} />
                    </Link>
                    {menuData.departments.length > 0 && renderDepartmentsDropdown()}
                  </li>
                  <li className="relative group">
                    <Link 
                      href="/services" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853] flex items-center" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      الخدمات 
                    </Link>
                    {menuData.services && menuData.services.length > 0 && renderEntityDropdown(menuData.services, "services")}
                  </li>
                  <li className="relative group">
                    <Link 
                      href="/doctors" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853] flex items-center" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      الاطباء 
                    </Link>
                    {menuData.doctors && menuData.doctors.length > 0 && renderEntityDropdown(menuData.doctors, "doctors")}
                  </li>
                  <li className="relative group">
                    <Link 
                      href="/offers" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853] flex items-center" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      العروض <FaChevronDown className="mr-1 text-xs" style={{ color: props.nav ? 'black' : 'white' }} />
                    </Link>
                    {menuData.offers.length > 0 && renderEntityDropdown(menuData.offers, "offers")}
                  </li>
                  <li>
                    <Link 
                      href="/blogs" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853]" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      المقالات
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="py-2 px-[2px] lg:px-3 hover:!text-[#CBA853]" 
                      style={{ color: props.nav ? 'black' : 'white' }}
                    >
                      اتصل بنا
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Search and Account Icons */}
              <div
                className={`flex flex-col  items-center order-3 md:order-3 md:absolute md:left-3 lg:left-8 md:top-[32px] md:transform md:-translate-y-1/2 gap-3  lg:mt-0 md:!gap-8 xl:!gap-3
                   ` + (isAuthenticated ? " mt-[50px] md:mt-[7px]" :"md:flex-row !gap-1")}
              >
                {/* Account Icon (User) */}
                <div className="relative ">
                  <div
                    onClick={() => setShowAuthPopup(!showAuthPopup)}
                    className="flex items-center gap-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-50 transition-colors  "
                  >
                    <FaUser className="text-[#dec06a]" size={20} />
                    {isAuthenticated && (
                      <div className="flex flex-col">
                        <span className="text-black text-sm hidden md:inline">مرحبًا</span>
                        <span className="text-black text-sm hidden lg:inline">{clientName}</span>
                        <FaCheckCircle className="text-green-500 md:hidden" />
                      </div>
                    )}
                  </div>

                  {/* Popup */}
                  {(showAuthPopup || props.showAuthprop) && (
                    <div
                      ref={authPopupRef}
                      className="absolute top-full left-0 md:top-[-115px] !left-15 mt-2 w-70 bg-white rounded-lg shadow-lg p-4 z-50"
                    >
                      {!isAuthenticated ? (
                        <>
                          {authStep === 1 && (
                            <form onSubmit={handleEmailSubmit}>
                              <h3 className="text-lg font-semibold mb-4 text-right">تسجيل الدخول</h3>
                              {authError && <div className="text-red-500 text-sm mb-4 text-right">{authError}</div>}
                              <div className="mb-4">
                                <label className="block text-right mb-2">البريد الإلكتروني</label>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                  className="w-full px-2 py-2 border border-gray-300 rounded text-right"
                                  placeholder="example@example.com"
                                />
                              </div>
                              <button
                                type="submit"
                                className="w-full bg-[#CBA853] text-white py-2 rounded hover:bg-[#A58532] transition"
                              >
                                إرسال رمز التحقق 
                              </button>
                            </form>
                          )}
                          
                          {authStep === 2 && (
                            <form onSubmit={handleVerificationSubmit}>
                              <h3 className="text-lg font-semibold mb-4 text-right">تحقق من البريد الإلكتروني</h3>
                              {authError && <div className="text-red-500 text-sm mb-4 text-right">{authError}</div>}
                              <p className="text-right mb-4">تم إرسال رمز التحقق إلى {email}</p>
                              
                              <div className="mb-4">
                                <label className="block text-right mb-2">رمز التحقق</label>
                                <div className="flex gap-2 justify-end" dir="ltr">
                                  {[0, 1, 2, 3].map((index) => (
                                    <input
                                      key={index}
                                      type="text"
                                      maxLength={1}
                                      value={verificationCode[index] || ''}

onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.length > 1) {
    const pastedCode = e.target.value.slice(0, 4);
    setVerificationCode(pastedCode);
    return;
  }
  
  const newCode = [...verificationCode.padEnd(4, ' ')];
  newCode[index] = e.target.value;
  setVerificationCode(newCode.join('').trim());
  
  if (e.target.value && index < 3) {
    const nextElement = e.target.nextElementSibling as HTMLInputElement;
    if (nextElement) {
      nextElement.focus();
    }
  }
}}
onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  if (e.key === 'Backspace' && !target.value && index > 0) {
    const prevElement = target.previousElementSibling as HTMLInputElement;
    if (prevElement) {
      prevElement.focus();
    }
  }
}}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 4);
                                        if (pastedData.length === 4) {
                                          setVerificationCode(pastedData);
                                        }
                                      }}
                                      required
                                      className="w-12 h-12 px-3 py-2 border border-gray-300 rounded text-center text-xl"
                                      pattern="[0-9]"
                                      inputMode="numeric"
                                    />
                                  ))}
                                </div>
                              </div>
                              
                              <button
                                type="submit"
                                className="w-full bg-[#CBA853] text-white py-2 rounded hover:bg-[#A58532] transition"
                              >
                                تأكيد
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => setAuthStep(1)}
                                className="w-full mt-2 text-[#CBA853] py-2 rounded hover:underline"
                              >
                                تغيير البريد الإلكتروني او ارسال رمز جديد
                              </button>
                            </form>
                          )}
                          
                          {authStep === 3 && (
                            <form onSubmit={handleUserInfoSubmit}>
                              <h3 className="text-lg font-semibold mb-4 text-right">أكمل معلوماتك</h3>
                              {authError && <div className="text-red-500 text-sm mb-4 text-right">{authError}</div>}
                              
                              <div className="mb-4">
                                <label className="block text-right mb-2">الاسم الأول</label>
                                <input
                                  type="text"
                                  value={userInfo.firstName}
                                  onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-right"
                                />
                              </div>

                              <div className="mb-4">
                                <label className="block text-right mb-2">الاسم الأخير</label>
                                <input
                                  type="text"
                                  value={userInfo.lastName}
                                  onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-right"
                                />
                              </div>

                              <div className="mb-4">
  <label className="block text-right mb-2">رقم الهاتف*</label>
  <input
    type="tel"
    value={userInfo.phoneNumber}
    onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
    required
    className="w-full px-3 py-2 border border-gray-300 rounded text-right"
    placeholder="رقم الهاتف السعودي (مثال: 05xxxxxxxx)*"
    pattern="^(?:(?:\+?966|0)?5[0-9]{8})$"
    inputMode="numeric"
  />
</div>

                              <div className="mb-4">
                                <label className="block text-right mb-2">رقم الهوية</label>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={userInfo.identity_number || ""}
                                  onChange={(e) => setUserInfo({ ...userInfo, identity_number: e.target.value })}
                                  placeholder="1234567890"
                                  required
                                  minLength={10}
                                  maxLength={10}
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-right"
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full bg-[#CBA853] text-white py-2 rounded hover:bg-[#A58532] transition"
                              >
                                حفظ
                              </button>
                            </form>
                          )}
                        </>
                      ) : (
                        <div className="text-right">
                          <h3 className="text-lg font-semibold mb-2">مرحباً</h3>
                          <p className="mb-4">الاسم: {clientName}</p>
                          <p className="mb-4">البريد الإلكتروني: {email}</p>
                          <button className="w-full gradient py-2 rounded transition mb-1">
                            <Link href={"/profile"} className="!text-white">
                              حسابي
                            </Link>
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                          >
                            تسجيل الخروج
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Show wishlist + calendar only on same row if not authenticated */}
                <div className={`flex flex-col md:flex-row gap-3`}>
                  {/* Wishlist Icon */}
                  {renderWishlistIcon()}

                  {/* Calendar Icon with appointment count */}
               {isAuthenticated && renderAppointmentIcon()}

                  {/* Notifications Bell */}
                  {isAuthenticated && renderNotificationsIcon()}
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex md:hidden order-1 md:order-none mt-4">
                <MobileMenu menuData={menuData} />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Wishlist Sidebar */}
      <WishlistSidebar 
        wishlistOpen={wishlistOpen} 
        setWishlistOpen={setWishlistOpen}
      />
      {/* Navigation Loading Indicator */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-4 rounded-lg flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CBA853] mr-3"></div>
            <span>جاري التوجيه إلى الصفحة الرئيسية...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;